import React, { useState } from 'react';
import { Card, Button, TextInput, Label, Badge } from 'flowbite-react';
import { Line, Bar } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { HiPlus, HiClock } from 'react-icons/hi';


ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title,Tooltip,Legend);

const FamilyDashboard = () => {
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [newReminder, setNewReminder] = useState({ title: '', time: '' });
  const [reminders, setReminders] = useState([
    { title: 'Take Medicine', time: '09:00 AM' },
    { title: 'Doctor Appointment', time: '02:30 PM' },
  ]);

  
  const healthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Blood Pressure',
        data: [120, 125, 118, 122, 119, 121],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1,
      },
    ],
  };

  const dietData = {
    labels: ['Proteins', 'Carbs', 'Fats', 'Fiber'],
    datasets: [
      {
        label: 'Daily Intake (grams)',
        data: [65, 130, 50, 25],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(59, 130, 246, 0.4)',
          'rgba(59, 130, 246, 0.2)',
        ],
      },
    ],
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (newReminder.title && newReminder.time) {
      setReminders([...reminders, newReminder]);
      setNewReminder({ title: '', time: '' });
      setShowReminderForm(false);
    }
  };

  return (
    <div className="p-4 bg-white">
     
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-500 mb-2">Health Dashboard</h1>
        <p className="text-gray-600">Track your family's health and wellness</p>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Blood Pressure</h3>
            <p className="text-2xl font-bold text-blue-500">121/80</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Heart Rate</h3>
            <p className="text-2xl font-bold text-blue-500">72 BPM</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Weight</h3>
            <p className="text-2xl font-bold text-blue-500">68 kg</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700">Steps</h3>
            <p className="text-2xl font-bold text-blue-500">8,432</p>
          </div>
        </Card>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mx-auto">
        <Card>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Blood Pressure Trends</h3>
          <Line data={healthData} options={{ responsive: true }} />
        </Card>
        
      </div>

      
      <Card className="mb-6 ">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Diet Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-500">Breakfast</h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Oatmeal with fruits</li>
              <li>Greek yogurt</li>
              <li>Green tea</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-500">Lunch</h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Grilled chicken</li>
              <li>Mixed vegetables</li>
              <li>Brown rice</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-500">Dinner</h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Fish fillet</li>
              <li>Quinoa</li>
              <li>Steamed broccoli</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Reminders</h3>
          <Button color="blue" onClick={() => setShowReminderForm(true)}>
            <HiPlus className="mr-2 h-5 w-5" />
            Add Reminder
          </Button>
        </div>

        {showReminderForm && (
          <form onSubmit={handleAddReminder} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" value="Reminder Title" />
                <TextInput
                  id="title"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time" value="Time" />
                <TextInput
                  id="time"
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button type="submit" color="blue">Add</Button>
              <Button color="gray" onClick={() => setShowReminderForm(false)}>Cancel</Button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.map((reminder, index) => (
            <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
              <HiClock className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="font-medium text-gray-700">{reminder.title}</p>
                <p className="text-sm text-gray-500">{reminder.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FamilyDashboard;
