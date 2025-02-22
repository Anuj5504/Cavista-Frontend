import { useState, useEffect } from 'react';
import { Card, Button, TextInput, Label, Checkbox, Progress } from 'flowbite-react';
import { Line } from 'react-chartjs-2';
import { HiCheck, HiX, HiHeart, HiLightningBolt, HiScale, HiArrowUp } from 'react-icons/hi';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const FamilyDashboard = () => {
  const [healthParams, setHealthParams] = useState({
    bloodPressure: '121/80',
    heartRate: '72',
    weight: '68',
    height: '170',
    bmi: '23.5'
  });

  const [todayGoals, setTodayGoals] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [caregiver, setCaregiver] = useState({
    name: 'Sumit',
    contact: '999999999',
    email: 'sumit.j@healthcare.com',
    specialization: 'General Care'
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'General Checkup',
      doctor: 'Dr. kunal',
      date: '2024-03-25 10:00 AM'
    },
    {
      id: 2,
      title: 'Cardiology Review',
      doctor: 'Dr. Darshan',
      date: '2024-03-28 2:30 PM'
    },
  ]);

  const [fitbitData, setFitbitData] = useState({
    profile: null,
    dailyActivity: null,
    error: null
  });

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user._id;

        await Promise.all([
          fetchTodayGoals(),
          fetchCaregiver(userId),
          fetchFitbitData()
        ]);
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      }
    };

    initializeDashboard();
  }, []);

  const fetchTodayGoals = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user._id;

      const response = await axios.get(`http://localhost:3000/api/goals/patient/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setTodayGoals(response.data);

      // Get all completed todos from all goals
      const completedTodos = response.data.flatMap(goal =>
        goal.todos.filter(todo => todo.status === 'completed')
      );
      setCompletedTasks(completedTodos);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const fetchCaregiver = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/patients/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Check if patient has an assigned caregiver
      if (response.data.caregiver) {
        setCaregiver({
          name: response.data.caregiver.name,
          email: response.data.caregiver.email,
          contact: response.data.caregiver.contact || 'Not provided',
          specialization: response.data.caregiver.specialization || 'General Care'
        });
      } else {
        setCaregiver(null); // No caregiver assigned
      }
    } catch (error) {
      console.error('Error fetching caregiver details:', error);
      setCaregiver(null);
    }
  };

  const fetchFitbitData = async () => {
    const token = localStorage.getItem("fitbitToken");
    if (!token) {
      console.error("Fitbit token not found");
      return;
    }

    try {
      // Fetch user profile
      const profileResponse = await fetch("https://api.fitbit.com/1/user/-/profile.json", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Fetch daily activity
      const todayDate = new Date().toISOString().split("T")[0];
      const activityResponse = await fetch(
        `https://api.fitbit.com/1/user/-/activities/date/${todayDate}.json`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!profileResponse.ok || !activityResponse.ok) {
        throw new Error("Failed to fetch Fitbit data");
      }

      const profileData = await profileResponse.json();
      const activityData = await activityResponse.json();

      setFitbitData({
        profile: profileData.user,
        dailyActivity: activityData,
        error: null
      });
    } catch (error) {
      console.error("Error fetching Fitbit data:", error);
      setFitbitData(prev => ({ ...prev, error: error.message }));
    }
  };

  const handleTaskComplete = async (todoId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/goals/todo/${todoId}`,
        { status: 'completed' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update local state
      setTodayGoals(prevGoals =>
        prevGoals.map(goal => ({
          ...goal,
          todos: goal.todos.map(todo =>
            todo._id === todoId
              ? { ...todo, status: 'completed' }
              : todo
          )
        }))
      );

      // Add the completed task to completedTasks
      const completedTodo = todayGoals
        .flatMap(goal => goal.todos)
        .find(todo => todo._id === todoId);

      if (completedTodo) {
        setCompletedTasks(prev => [...prev, { ...completedTodo, status: 'completed' }]);
      }

    } catch (error) {
      console.error('Error completing task:', error);
      alert('Failed to complete task');
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Health Overview</h2>

        {/* Health Overview Section */}
        <div className="space-y-6">
          {fitbitData.error && (
            <div className="text-red-500 text-center mb-4">{fitbitData.error}</div>
          )}

          {/* Profile Header if available */}
          {fitbitData.profile && (
            <Card className="mb-6">
              <div className="flex items-center space-x-4">
                {fitbitData.profile.avatar150 && (
                  <img
                    src={fitbitData.profile.avatar150}
                    alt="User Avatar"
                    className="rounded-full w-20 h-20"
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold">{fitbitData.profile.fullName}</h2>
                  <p className="text-gray-500">{fitbitData.profile.displayName}</p>
                  <p className="text-sm text-gray-600">Member Since: {fitbitData.profile.memberSince}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Activity Summary Cards */}
          {fitbitData.dailyActivity && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Steps Card */}
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Daily Steps</p>
                    <h3 className="text-2xl font-bold text-blue-600">
                      {fitbitData.dailyActivity.summary.steps}
                    </h3>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <HiLightningBolt className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <Progress
                  progress={(fitbitData.dailyActivity.summary.steps / fitbitData.dailyActivity.goals.steps) * 100}
                  size="sm"
                  color="blue"
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Goal: {fitbitData.dailyActivity.goals.steps} steps
                </p>
              </Card>

              {/* Calories Card */}
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Calories Burned</p>
                    <h3 className="text-2xl font-bold text-orange-600">
                      {fitbitData.dailyActivity.summary.caloriesOut}
                    </h3>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <HiLightningBolt className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <Progress
                  progress={(fitbitData.dailyActivity.summary.caloriesOut / fitbitData.dailyActivity.goals.caloriesOut) * 100}
                  size="sm"
                  color="warning"
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Goal: {fitbitData.dailyActivity.goals.caloriesOut} cal
                </p>
              </Card>

              {/* Distance Card */}
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Distance</p>
                    <h3 className="text-2xl font-bold text-purple-600">
                      {fitbitData.dailyActivity.summary.distances?.find(d => d.activity === "total")?.distance || "N/A"} km
                    </h3>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <HiScale className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <Progress
                  progress={(fitbitData.dailyActivity.summary.distances?.find(d => d.activity === "total")?.distance / fitbitData.dailyActivity.goals.distance) * 100}
                  size="sm"
                  color="purple"
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Goal: {fitbitData.dailyActivity.goals.distance} km
                </p>
              </Card>

              {/* Floors Card */}
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Floors</p>
                    <h3 className="text-2xl font-bold text-indigo-600">
                      {fitbitData.dailyActivity.summary.floors}
                    </h3>
                  </div>
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <HiArrowUp className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <Progress
                  progress={(fitbitData.dailyActivity.summary.floors / fitbitData.dailyActivity.goals.floors) * 100}
                  size="sm"
                  color="indigo"
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Goal: {fitbitData.dailyActivity.goals.floors} floors
                </p>
              </Card>
            </div>
          )}

          {/* Detailed Activity Summary */}
          {fitbitData.dailyActivity && (
            <Card className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Activity Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Very Active Minutes</p>
                  <p className="font-medium">{fitbitData.dailyActivity.summary.veryActiveMinutes} min</p>
                </div>
                <div>
                  <p className="text-gray-600">Fairly Active Minutes</p>
                  <p className="font-medium">{fitbitData.dailyActivity.summary.fairlyActiveMinutes} min</p>
                </div>
                <div>
                  <p className="text-gray-600">Lightly Active Minutes</p>
                  <p className="font-medium">{fitbitData.dailyActivity.summary.lightlyActiveMinutes} min</p>
                </div>
                <div>
                  <p className="text-gray-600">Sedentary Minutes</p>
                  <p className="font-medium">{fitbitData.dailyActivity.summary.sedentaryMinutes} min</p>
                </div>
              </div>
            </Card>
          )}

          {/* Daily Goals */}
          {fitbitData.dailyActivity?.goals && (
            <Card className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Steps Goal */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 mb-2">Steps Goal</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold text-blue-600">
                      {fitbitData.dailyActivity.goals.steps}
                    </p>
                    <div className="text-sm text-gray-500">
                      Current: {fitbitData.dailyActivity.summary.steps}
                    </div>
                  </div>
                  <Progress
                    progress={(fitbitData.dailyActivity.summary.steps / fitbitData.dailyActivity.goals.steps) * 100}
                    size="sm"
                    color="blue"
                    className="mt-2"
                  />
                </div>

                {/* Calories Goal */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 mb-2">Calories Goal</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold text-orange-600">
                      {fitbitData.dailyActivity.goals.caloriesOut}
                    </p>
                    <div className="text-sm text-gray-500">
                      Current: {fitbitData.dailyActivity.summary.caloriesOut}
                    </div>
                  </div>
                  <Progress
                    progress={(fitbitData.dailyActivity.summary.caloriesOut / fitbitData.dailyActivity.goals.caloriesOut) * 100}
                    size="sm"
                    color="warning"
                    className="mt-2"
                  />
                </div>

                {/* Distance Goal */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 mb-2">Distance Goal</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold text-purple-600">
                      {fitbitData.dailyActivity.goals.distance} km
                    </p>
                    <div className="text-sm text-gray-500">
                      Current: {fitbitData.dailyActivity.summary.distances?.find(d => d.activity === "total")?.distance || "0"} km
                    </div>
                  </div>
                  <Progress
                    progress={(fitbitData.dailyActivity.summary.distances?.find(d => d.activity === "total")?.distance / fitbitData.dailyActivity.goals.distance) * 100}
                    size="sm"
                    color="purple"
                    className="mt-2"
                  />
                </div>

                {/* Floors Goal */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 mb-2">Floors Goal</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold text-indigo-600">
                      {fitbitData.dailyActivity.goals.floors}
                    </p>
                    <div className="text-sm text-gray-500">
                      Current: {fitbitData.dailyActivity.summary.floors}
                    </div>
                  </div>
                  <Progress
                    progress={(fitbitData.dailyActivity.summary.floors / fitbitData.dailyActivity.goals.floors) * 100}
                    size="sm"
                    color="indigo"
                    className="mt-2"
                  />
                </div>

                {/* Active Minutes Goal */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 mb-2">Active Minutes Goal</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold text-green-600">
                      {fitbitData.dailyActivity.goals.activeMinutes} min
                    </p>
                    <div className="text-sm text-gray-500">
                      Current: {fitbitData.dailyActivity.summary.veryActiveMinutes} min
                    </div>
                  </div>
                  <Progress
                    progress={(fitbitData.dailyActivity.summary.veryActiveMinutes / fitbitData.dailyActivity.goals.activeMinutes) * 100}
                    size="sm"
                    color="success"
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Personal Information */}
          {fitbitData.profile && (
            <Card className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600">Age</p>
                  <p className="font-medium">{fitbitData.profile.age} years</p>
                </div>
                <div>
                  <p className="text-gray-600">Gender</p>
                  <p className="font-medium">{fitbitData.profile.gender}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date of Birth</p>
                  <p className="font-medium">{fitbitData.profile.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-gray-600">Height</p>
                  <p className="font-medium">{fitbitData.profile.height} cm</p>
                </div>
                <div>
                  <p className="text-gray-600">Weight</p>
                  <p className="font-medium">{fitbitData.profile.weight} kg</p>
                </div>
                <div>
                  <p className="text-gray-600">Time Zone</p>
                  <p className="font-medium">{fitbitData.profile.timezone}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Card className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Today's Tasks</h3>
        <div className="space-y-4">
          {todayGoals.map(goal => (
            <div key={goal._id} className="border-b pb-4">
              {goal.todos
                .filter(todo => todo.status === 'pending')
                .map(todo => (
                  <div
                    key={todo._id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                    onClick={() => handleTaskComplete(todo._id)}
                  >
                    <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-50" />
                    </div>
                    <div>
                      <span className="text-gray-700">{todo.title}</span>
                      {todo.description && (
                        <p className="text-sm text-gray-500">{todo.description}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}

          {todayGoals.length === 0 && (
            <p className="text-center text-gray-500">No tasks for today</p>
          )}
        </div>

        {completedTasks.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-lg font-medium text-gray-700 mb-4">
              Completed Tasks ({completedTasks.length})
            </h4>
            <div className="space-y-2">
              {completedTasks.map(todo => (
                <div
                  key={todo._id}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                >
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <HiCheck className="text-white text-sm" />
                  </div>
                  <div>
                    <span className="text-gray-500 line-through">{todo.title}</span>
                    {todo.description && (
                      <p className="text-sm text-gray-400 line-through">{todo.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {caregiver ? (
        <Card className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Caretaker Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{caregiver.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Contact</p>
              <p className="font-medium">{caregiver.contact}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{caregiver.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Specialization</p>
              <p className="font-medium">{caregiver.specialization}</p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="mb-6">
          <div className="text-center py-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Caretaker Assigned</h3>
            <p className="text-gray-500">A healthcare provider will be assigned to you soon.</p>
          </div>
        </Card>
      )}

      <Card>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h3>
        <div className="space-y-4">
          {appointments.map(appointment => (
            <div key={appointment.id} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{appointment.title}</p>
                <p className="text-sm text-gray-600">{appointment.doctor}</p>
              </div>
              <p className="text-blue-500">{appointment.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FamilyDashboard;
