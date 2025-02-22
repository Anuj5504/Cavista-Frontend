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
      const response = await fetch(`http://localhost:3000/api/goals/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      // Organize goals by date
      const tasksByDate = {};
      data.forEach(goal => {
        if (goal.date) {
          const dateKey = new Date(goal.date).toISOString().split('T')[0];
          tasksByDate[dateKey] = goal.todos || [];
        }
      });

      setDailyTasks(tasksByDate);
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
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

      setDailyTasks({
        ...dailyTasks,
        [dateKey]: [...currentTasks, { ...newTodo, id: Date.now() }]
      });

      setNewTodo({
        title: '',
        description: '',
        status: 'pending'
      });
    }
  };

  const handleRemoveTodo = (date, todoId) => {
    const dateKey = new Date(date).toISOString().split('T')[0];
    const updatedTasks = dailyTasks[dateKey].filter(todo => todo.id !== todoId);

    setDailyTasks({
      ...dailyTasks,
      [dateKey]: updatedTasks
    });
  };

  const handleSubmitGoal = async (date) => {
    const dateKey = new Date(date).toISOString().split('T')[0];
    const todosForDate = dailyTasks[dateKey];
    console.log(todosForDate)
    if (!todosForDate || todosForDate.length === 0) {
        alert('No tasks added for this date');
        return;
    }

    try {
        const token = localStorage.getItem('token');

        // Save each todo in TodosModel
        const todoResponses = await Promise.all(todosForDate.map(todo =>
            fetch('http://localhost:3000/api/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(todo),
            }).then(res => res.json())
        ));

        const todoIds = todoResponses.map(todo => todo._id);

        // Now save goal with the saved todo IDs
        const response = await fetch('http://localhost:3000/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                patient: id,
                date: dateKey,
                todos: todoIds
            }),
        });

        if (response.ok) {
            // Clear only the submitted date's tasks
            const { [dateKey]: removedTasks, ...remainingTasks } = dailyTasks;
            setDailyTasks(remainingTasks);
            setSelectedDate('');
            fetchGoals();
        }
    } catch (error) {
        console.error('Error creating goal:', error);
    }
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
          <Card key={date} className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Tasks for {new Date(date).toLocaleDateString()}
              </h3>
              <Button
                color="success"
                size="sm"
                onClick={() => handleSubmitGoal(date)}
              >
                <HiSave className="mr-2 h-4 w-4" />
                Save Day's Tasks
              </Button>
            </div>
            <div className="space-y-3">
              {todos.map((todo) => (
                <div key={todo.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{todo.title}</h4>
                    <p className="text-sm text-gray-600">{todo.description}</p>
                  </div>
                  <Button
                    color="failure"
                    size="xs"
                    onClick={() => handleRemoveTodo(date, todo.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignTask;
