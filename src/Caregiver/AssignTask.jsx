import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextInput, Textarea, Card, Select } from 'flowbite-react';
import { HiPlus, HiClock, HiCalendar, HiSave } from 'react-icons/hi';
import FamilyMenu from './FamilyMenu';

const AssignTask = () => {
  const { id } = useParams();
  const [patientDetails, setPatientDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [dailyTasks, setDailyTasks] = useState({}); // Store tasks by date
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPatientDetails(data);
        fetchGoals();
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Fetching goals for patient:', id); // Debug log

      const response = await fetch(`http://localhost:3000/api/goals/patient/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Server error response:', data); // Debug log
        throw new Error(data.msg || 'Failed to fetch goals');
      }

      // Handle empty response
      if (!data || !Array.isArray(data)) {
        console.log('No goals data received or invalid format'); // Debug log
        setDailyTasks({});
        setGoals([]);
        return;
      }

      console.log('Received goals:', data.length); // Debug log

      // Organize goals by date
      const tasksByDate = {};
      data.forEach(goal => {
        if (goal.date && goal.todos) {
          const dateKey = new Date(goal.date).toISOString().split('T')[0];
          if (!tasksByDate[dateKey]) {
            tasksByDate[dateKey] = [];
          }
          // Add each todo from the goal to that date's tasks
          if (Array.isArray(goal.todos)) {
            tasksByDate[dateKey].push(...goal.todos);
          }
        }
      });

      console.log('Organized tasks by date:', Object.keys(tasksByDate).length); // Debug log

      setDailyTasks(tasksByDate);
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      // Show more detailed error message to user
      const errorMessage = error.message || 'Failed to fetch goals. Please try again.';
      alert(errorMessage);

      // Clear state on error
      setDailyTasks({});
      setGoals([]);
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Please select a date first');
      return;
    }

    if (newTodo.title && newTodo.description) {
      const dateKey = new Date(selectedDate).toISOString().split('T')[0];
      const currentTasks = dailyTasks[dateKey] || [];

      // Remove id from the new todo
      setDailyTasks({
        ...dailyTasks,
        [dateKey]: [...currentTasks, {
          title: newTodo.title,
          description: newTodo.description,
          status: 'pending'
        }]
      });

      setNewTodo({
        title: '',
        description: '',
        status: 'pending'
      });
    }
  };

  const handleRemoveTodo = (date, todoIndex) => {
    const dateKey = new Date(date).toISOString().split('T')[0];
    const updatedTasks = dailyTasks[dateKey].filter((_, index) => index !== todoIndex);

    setDailyTasks({
      ...dailyTasks,
      [dateKey]: updatedTasks
    });
  };

  const handleSubmitGoal = async (date) => {
    const dateKey = new Date(date).toISOString().split('T')[0];
    const todosForDate = dailyTasks[dateKey];

    if (!todosForDate || todosForDate.length === 0) {
      alert('No tasks added for this date');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      // Single API call to create goal and todos
      const response = await fetch('http://localhost:3000/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId: id,
          date: dateKey,
          todos: todosForDate
        }),
      });

      if (response.ok) {
        // Clear only the submitted date's tasks
        const { [dateKey]: removedTasks, ...remainingTasks } = dailyTasks;
        setDailyTasks(remainingTasks);
        setSelectedDate('');
        fetchGoals();
      } else {
        const errorData = await response.json();
        alert(`Failed to save tasks: ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error creating goal:', error);
      alert('Failed to save tasks. Please try again.');
    }
  };

  const TaskCard = ({ date, todos }) => {
    // Check if there are any unsaved todos (todos without _id)
    const hasUnsavedTodos = todos.some(todo => !todo._id);

    return (
      <Card key={date} className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Tasks for {new Date(date).toLocaleDateString()}
          </h3>
          {hasUnsavedTodos && (
            <Button
              color="success"
              size="sm"
              onClick={() => handleSubmitGoal(date)}
            >
              <HiSave className="mr-2 h-4 w-4" />
              Save Day's Tasks
            </Button>
          )}
        </div>
        <div className="space-y-3">
          {todos.map((todo, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{todo.title}</h4>
                <p className="text-sm text-gray-600">{todo.description}</p>
                <span className={`text-xs ${todo.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  Status: {todo.status}
                </span>
              </div>
              {!todo._id && (
                <Button
                  color="failure"
                  size="xs"
                  onClick={() => handleRemoveTodo(date, index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 border-r">
        <FamilyMenu onMenuSelect={() => { }} activeItem="assign" />
      </div>

      {/* Main Content */}
      <div className="p-6 w-3/4 overflow-y-auto">
        {/* Patient Info Card */}
        {patientDetails && (
          <Card className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Patient Information</h2>
            <p><strong>Name:</strong> {patientDetails.name}</p>
            <p><strong>House ID:</strong> {patientDetails.houseId}</p>
            <p><strong>Age:</strong> {patientDetails.age}</p>
            <p><strong>Medical Conditions:</strong> {patientDetails.medicalConditions || 'N/A'}</p>
          </Card>
        )}

        {/* Task Creation Form */}
        <Card className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Daily Tasks</h2>
          <div className="mb-4">
            <TextInput
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <form onSubmit={handleAddTodo} className="space-y-4">
            <TextInput
              type="text"
              placeholder="Task Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              required
            />

            <Textarea
              placeholder="Task Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              required
              rows={3}
            />

            <Button type="submit" className="w-full">
              <HiPlus className="mr-2 h-5 w-5" />
              Add Task
            </Button>
          </form>
        </Card>

        {/* Display tasks grouped by date */}
        {Object.entries(dailyTasks).map(([date, todos]) => (
          <TaskCard key={date} date={date} todos={todos} />
        ))}
      </div>
    </div>
  );
};

export default AssignTask;
