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
  const [assignedPatients, setAssignedPatients] = useState([]);

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

      // Separate patients into assigned and unassigned
      const allPatients = response.data;
      const unassigned = allPatients.filter(p => !p.caregiver);
      const assigned = allPatients.filter(p => p.caregiver);

      setPatients(unassigned);
      setAssignedPatients(assigned);
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
        const response = await axios.put(
          'http://localhost:3000/api/patients/update-caregiver',
          {
            patientId: selectedPatient._id,
            caregiverId: provider._id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 200) {
          // Add to assignments list with more details
          const newAssignment = {
            patient: selectedPatient.name,
            provider: provider.name,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            status: 'Active',
            patientId: selectedPatient._id,
            providerId: provider._id
          };

          setAssignments(prev => [newAssignment, ...prev].slice(0, 5)); // Keep only last 5 assignments

          // Remove assigned patient from the list
          setPatients((prev) => prev.filter((p) => p._id !== selectedPatient._id));

          // Clear selection and hide provider list
          setSelectedPatient(null);
          setShowProviderList(false);

          // Show success message
          alert('Caregiver assigned successfully!');
        }
      } catch (error) {
        console.error('Error assigning caregiver:', error);
        alert('Failed to assign caregiver: ' + (error.response?.data?.msg || error.message));
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
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-4 max-h-96 overflow-y-auto">
          <h2 className="font-semibold text-lg mb-4">Unassigned Patients</h2>
          {Array.isArray(patients) && patients.length > 0 ? (
            patients.map((patient) => (
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
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Assign
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No unassigned patients</p>
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

      <div className="mt-8">
        <h2 className="font-semibold text-xl mb-6">Patient Assignments</h2>
        <div className="grid gap-4">
          {assignedPatients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white shadow-lg rounded-2xl p-4 transition-all hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg font-semibold">
                      {patient.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-500">{patient.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">Assigned to:</span>
                      <span className="text-sm font-medium text-gray-700">
                        {patient.caregiver?.name || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {patient.caregiver?.email || 'N/A'}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}

          {assignments.map((assignment, index) => (
            <div
              key={`recent-${index}`}
              className="bg-white shadow-lg rounded-2xl p-4 transition-all hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg font-semibold">
                      {assignment.patient.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{assignment.patient}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">Assigned to:</span>
                      <span className="text-sm font-medium text-gray-700">{assignment.provider}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{assignment.date}</div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                    {assignment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {assignedPatients.length === 0 && assignments.length === 0 && (
            <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Patient Assignments</h3>
              <p className="text-gray-500">Assigned patients will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
