import React, { useState, useEffect } from 'react'
import FamilyDashboard from '../ComponentsUI/FamilyDashboard'
import FamilyMembers from '../ComponentsUI/FamilyMembers'
import FamilyMenu from '../ComponentsUI/FamilyMenu'
import ConnectFit from '../ComponentsUI/ConnectFit';
import { useNavigate } from 'react-router-dom';

const FamDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <FamilyDashboard />;
      case 'members':
        return <FamilyMembers setActiveComponent={setActiveComponent} />;
      case 'connect':
        return <ConnectFit />
      default:
        return <FamilyDashboard />;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    if (token && role == 'patient') {
      navigate('/family');
    } else navigate('/home');
  }, [navigate]);

  return (
    <div className="flex">
      <div className="w-64 min-h-screen">
        <FamilyMenu onMenuSelect={setActiveComponent} activeItem={activeComponent} />
      </div>
      <div className="flex-1 p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default FamDashboard;
