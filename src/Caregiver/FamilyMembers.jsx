import React, { useState } from 'react';
import { Table, Button } from 'flowbite-react';
import { HiArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const FamilyMembers = () => {
  const navigate = useNavigate();
  
  const [familyMembers, setFamilyMembers] = useState([
    { 
      id: 1, 
      name: 'Anuj Jadhav', 
      role: 'Admin',
    },
    { 
      id: 2, 
      name: 'Kunal Bodke', 
      role: 'Family Member',
    },
    { 
      id: 3, 
      name: 'Darshan Godase', 
      role: 'Family Member',
    },
    { 
      id: 4, 
      name: 'Prajwal Nimbalkar', 
      role: 'Family Member',
    }
  ]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Patients Name</h2>
      
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Name of Patients</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {familyMembers.map((member) => (
              <Table.Row key={member.id} className="bg-white">
                <Table.Cell className="font-medium text-gray-900">
                  {member.name}
                </Table.Cell>
                {/* <Table.Cell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    member.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.role}
                  </span>
                </Table.Cell> */}
                <Table.Cell>
                  <Button 
                    color="blue"
                    
                    size="sm"
                  >
                    <HiArrowRight className="h-4 w-4" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default FamilyMembers;