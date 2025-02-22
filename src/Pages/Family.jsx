import React, { useState } from 'react'
import FamilyDashboard from '../ComponentsUI/FamilyDashboard'
import FamilyMembers from '../ComponentsUI/FamilyMembers'
import FamilyMenu from '../ComponentsUI/FamilyMenu'

const Family = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <FamilyDashboard />;
      case 'members':
        return <FamilyMembers setActiveComponent={setActiveComponent}  />;
      default:
        return <FamilyDashboard />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen">
        <FamilyMenu onMenuSelect={setActiveComponent} activeItem={activeComponent} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Family;
