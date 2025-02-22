import React, { useState } from 'react';
import { Card, Button, TextInput, Label } from 'flowbite-react';
import { HiPlus, HiUserAdd } from 'react-icons/hi';

const FamilyMembers = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [familyMembers, setFamilyMembers] = useState([
    'John Doe',
    'Jane Doe',
    'Jimmy Doe',
    'Jenny Doe'
  ]);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMemberName.trim()) {
      setFamilyMembers([...familyMembers, newMemberName]);
      setNewMemberName('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-500">Family Members</h2>
        <Button 
          color="blue"
          onClick={() => setShowAddForm(true)}
        >
          <HiPlus className="mr-2 h-5 w-5" />
          Add Member
        </Button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <Card className="mb-4">
          <form onSubmit={handleAddMember} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="memberName" value="Member Name" />
              </div>
              <TextInput
                id="memberName"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Enter member name"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" color="blue">
                <HiUserAdd className="mr-2 h-5 w-5" />
                Add
              </Button>
              <Button color="gray" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Family Members List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {familyMembers.map((member, index) => (
          <Card key={index} className="bg-white hover:bg-blue-50 transition-colors">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {member.charAt(0)}
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900">{member}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FamilyMembers;
