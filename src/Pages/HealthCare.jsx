import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function HealthCare() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [providers, setProviders] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showProviderList, setShowProviderList] = useState(false);
  const [providerProfile, setProviderProfile] = useState({
    name: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/home');
      return;
    }

    fetchProviderProfile();
    fetchPatients();
  }, [navigate]);

  const fetchProviderProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/provider-profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProviderProfile(response.data);
    } catch (error) {
      console.error('Error fetching provider profile:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/patients', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error.response?.data || error.message);
    }
  };

  const fetchCaretakers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/caregivers', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setProviders(response.data);
    } catch (error) {
      console.error('Error fetching caretakers:', error.response?.data || error.message);
    }
  };

  const handleAssign = async (provider) => {
    if (selectedPatient) {
      try {
        const token = localStorage.getItem('token');
        // Update patient with assigned caregiver
        const response = await axios.put(`http://localhost:3000/api/patients/${selectedPatient._id}`,
          { caregiver: provider._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 200) {
          setAssignments((prev) => [
            ...prev,
            {
              patient: selectedPatient.name,
              provider: provider.name,
              date: new Date().toLocaleDateString(),
              status: 'Active',
            },
          ]);

          setPatients((prev) => prev.filter((p) => p._id !== selectedPatient._id));
          setSelectedPatient(null);
          setShowProviderList(false);
        }
      } catch (error) {
        console.error('Error assigning caregiver:', error);
        alert('Failed to assign caregiver');
      }
    }
  };

  const handlePatientAssign = (patient) => {
    setSelectedPatient(patient);
    setShowProviderList(true);
    fetchCaretakers();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            {providerProfile.avatar ? (
              <img
                src={providerProfile.avatar}
                alt="Provider Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-2xl text-gray-600">
                  {providerProfile.name?.charAt(0) || 'P'}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{providerProfile.name || 'Loading...'}</h2>
            <p className="text-gray-600">{providerProfile.email || 'Loading...'}</p>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Patient Assignment Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-4 max-h-96 overflow-y-auto">
          <h2 className="font-semibold text-lg mb-4">Patients</h2>
          {Array.isArray(patients) && patients.map((patient) => (
            <div
              key={patient._id}
              className={`w-full text-left p-3 rounded-lg mb-2 border ${selectedPatient?._id === patient._id ? 'border-blue-500' : 'border-gray-200'
                }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-gray-500">Email: {patient.email}</p>
                </div>
                <button
                  onClick={() => handlePatientAssign(patient)}
                  className="px-4 py-1 bg-blue-500 text-white rounded-lg"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
          {Array.isArray(patients) && patients.length === 0 && (
            <p className="text-gray-500 text-center">No patients available</p>
          )}
        </div>

        {showProviderList && (
          <div className="bg-white shadow-lg rounded-2xl p-4 max-h-96 overflow-y-auto relative">
            <h2 className="font-semibold text-lg mb-4">Select a Caretaker</h2>
            {providers.map((caretaker) => (
              <div
                key={caretaker._id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 mb-2"
              >
                <div>
                  <p className="font-medium">{caretaker.name}</p>
                  <p className="text-sm text-gray-500">{caretaker.email}</p>
                </div>
                <button
                  onClick={() => handleAssign(caretaker)}
                  className="px-4 py-1 bg-green-500 text-white rounded-lg"
                >
                  Assign
                </button>
              </div>
            ))}
            {providers.length === 0 && (
              <p className="text-gray-500 text-center">No caretakers available</p>
            )}
            <button
              onClick={() => setShowProviderList(false)}
              className="mt-4 px-4 py-1 bg-red-500 text-white rounded-lg w-full"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 bg-white shadow-lg rounded-2xl p-4">
        <h2 className="font-semibold text-lg mb-4">Recent Assignments</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Patient</th>
              <th className="py-2">Provider</th>
              <th className="py-2">Date Assigned</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">{assignment.patient}</td>
                <td className="py-2">{assignment.provider}</td>
                <td className="py-2">{assignment.date}</td>
                <td className="py-2 text-green-600">{assignment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
