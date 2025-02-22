import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const patientsData = [
  { id: 'P-2025-001', name: 'Prajwal' },
  { id: 'P-2025-002', name: 'Anuj' },
  { id: 'P-2025-002', name: 'Darshan' },
];

const providersData = [
  { id: 'D-001', name: 'Dr. Kunal', specialty: 'Cardiologist' },
  { id: 'D-002', name: 'Dr. Sushant', specialty: 'Neurologist' },
];


export default function HealthCare() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState(patientsData);
  const [providers, setProviders] = useState(providersData);
  const [assignments, setAssignments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showProviderList, setShowProviderList] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    if (token && role == 'healthcare') {
      navigate('/healthproviderdashboard');
    } else navigate('/home');
  }, [navigate]);

  const handleAssign = (provider) => {
    if (selectedPatient) {
      setAssignments((prev) => [
        ...prev,
        {
          patient: selectedPatient.name,
          provider: provider.name,
          date: new Date().toLocaleDateString(),
          status: 'Active',
        },
      ]);

      let remainingPatient = patients.filter((patient) => (patient.id != selectedPatient.id));
      setPatients(remainingPatient);

      setSelectedPatient(null);
      setShowProviderList(false);
    }
  };

  const handlePatientAssign = (patient) => {
    setSelectedPatient(patient);
    setShowProviderList(true);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patient Assignment Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-4 max-h-96 overflow-y-auto">
          <h2 className="font-semibold text-lg mb-4">Patients</h2>
          {patients.map((patient) => (
            <div
              key={patient.id}
              className={`w-full text-left p-3 rounded-lg mb-2 border ${selectedPatient?.id === patient.id
                ? 'border-blue-500'
                : 'border-gray-200'
                }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-gray-500">ID: {patient.id}</p>
                </div>
                <button
                  onClick={() => {
                    handlePatientAssign(patient);
                  }}
                  className="px-4 py-1 bg-blue-500 text-white rounded-lg"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>


        {showProviderList && (
          <div className="bg-white shadow-lg rounded-2xl p-4 max-h-96 overflow-y-auto relative">
            <h2 className="font-semibold text-lg mb-4">Select a Healthcare Provider </h2>
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 mb-2"
              >
                <div>
                  <p className="font-medium">{provider.name}</p>
                  <p className="text-sm text-gray-500">{provider.specialty}</p>
                </div>
                <button
                  onClick={() => handleAssign(provider)}
                  className="px-4 py-1 bg-green-500 text-white rounded-lg"
                >
                  Assign
                </button>
              </div>
            ))}
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