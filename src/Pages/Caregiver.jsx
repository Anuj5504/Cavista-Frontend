import React, { useEffect, useState } from 'react'
import FamilyMembers from '../Caregiver/FamilyMembers'
import FamilyMenu from '../Caregiver/FamilyMenu'
import { useNavigate } from 'react-router-dom';

const Family = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const navigate = useNavigate();

    const renderComponent = () => {
        switch (activeComponent) {
            case 'members':
                return <FamilyMenu />;
            default:
                return <FamilyMembers />;
        }
    };

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

export default Family;