import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'flowbite-react';
import { HiArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const FamilyMembers = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const decodedToken = jwtDecode(token);
        const caregiverId = decodedToken.user._id; // Adjust based on your token structure
        console.log(caregiverId)

        const response = await fetch(`http://localhost:3000/api/patients`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        const data = await response.json();

        // Filter patients based on caregiver ID
        const filteredPatients = data.filter(
          (patient) => patient.caregiver === caregiverId
        );

        setPatients(filteredPatients);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientClick = (patientId) => {
    navigate(`/caregiver/assign-task/${patientId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Your Patients</h2>
        <div className="text-sm text-gray-600">Total Patients: {patients.length}</div>
      </div>

      {patients.length === 0 ? (
        <div className="text-center py-8 text-gray-600">No patients assigned yet</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-blue-50">Patient Name</Table.HeadCell>
              <Table.HeadCell className="bg-blue-50">House ID</Table.HeadCell>
              <Table.HeadCell className="bg-blue-50">Status</Table.HeadCell>
              <Table.HeadCell className="bg-blue-50">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {patients.map((patient) => (
                <Table.Row key={patient._id} className="bg-white">
                  <Table.Cell className="font-medium text-gray-900">{patient.name}</Table.Cell>
                  <Table.Cell>{patient.houseId}</Table.Cell>
                  <Table.Cell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${patient.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {patient.status || 'Active'}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="blue"
                      size="sm"
                      onClick={() => handlePatientClick(patient._id)}
                      className="flex items-center gap-2"
                    >
                      Assign Tasks
                      <HiArrowRight className="h-4 w-4" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};

export default FamilyMembers;
