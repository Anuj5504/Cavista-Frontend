import React, { useState, useEffect } from 'react';
import { Card, Button, TextInput, Label, Checkbox } from 'flowbite-react';
import { Line } from 'react-chartjs-2';
import { HiCheck, HiX } from 'react-icons/hi';

const FamilyDashboard = () => {
  const [healthParams, setHealthParams] = useState({
    bloodPressure: '121/80',
    heartRate: '72',
    weight: '68',
    height: '170',
    bmi: '23.5'
  });

  // Temporary todos data
  const [todos, setTodos] = useState([
    { id: 1, title: 'Take morning medicine' },
    { id: 2, title: 'Check blood pressure' },
    { id: 3, title: 'Evening walk' },
    { id: 4, title: 'Doctor appointment' }
  ]);
  
  const [completedTodos, setCompletedTodos] = useState([]);
  
  // Temporary caregiver data
  const [caregiver, setCaregiver] = useState({
    name: 'Sarah Johnson',
    contact: '+1 234-567-8900',
    email: 'sarah.j@healthcare.com',
    specialization: 'General Care'
  });

  // Temporary appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: 'General Checkup',
      doctor: 'Dr. Smith',
      date: '2024-03-25 10:00 AM'
    },
    {
      id: 2,
      title: 'Cardiology Review',
      doctor: 'Dr. Johnson',
      date: '2024-03-28 2:30 PM'
    },
    {
      id: 3,
      title: 'Blood Test',
      doctor: 'Lab Center',
      date: '2024-04-01 9:00 AM'
    }
  ]);

  const handleTodoComplete = (todoId) => {
    const completedTodo = todos.find(todo => todo.id === todoId);
    setCompletedTodos([...completedTodos, completedTodo]);
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  return (
    <div className="p-4 bg-white">
      {/* Health Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Blood Pressure</h3>
            <p className="text-2xl font-bold text-blue-500">{healthParams.bloodPressure}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Heart Rate</h3>
            <p className="text-2xl font-bold text-blue-500">{healthParams.heartRate} BPM</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Weight</h3>
            <p className="text-2xl font-bold text-blue-500">{healthParams.weight} kg</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Height</h3>
            <p className="text-2xl font-bold text-blue-500">{healthParams.height} cm</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">BMI</h3>
            <p className="text-2xl font-bold text-blue-500">{healthParams.bmi}</p>
          </div>
        </Card>
      </div>

      {/* Todo Section */}
      <Card className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Tasks</h3>
        <div className="space-y-4">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-2 p-2 hover:bg-gray-50">
              <Checkbox onChange={() => handleTodoComplete(todo.id)} />
              <span>{todo.title}</span>
            </div>
          ))}
        </div>

        {completedTodos.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Completed Tasks</h4>
            {completedTodos.map(todo => (
              <div key={todo.id} className="flex items-center gap-2 p-2 text-gray-500">
                <HiCheck className="text-green-500" />
                <span className="line-through">{todo.title}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Caregiver Information */}
      {caregiver && (
        <Card className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Caregiver Information</h3>
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
      )}

      {/* Appointments */}
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
