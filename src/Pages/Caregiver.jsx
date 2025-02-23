import React, { useEffect, useState } from 'react';
import FamilyMembers from '../Caregiver/FamilyMembers';
import FamilyMenu from '../Caregiver/FamilyMenu';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Family = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div className="flex flex-col min-h-screen">
            
            <div className="w-full bg-white shadow-md p-4 flex justify-between items-center md:hidden z-[100]">
                <button 
                    className="p-2 bg-gray-200 rounded" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu size={24} />
                </button>
            </div>
            
            <div className="flex flex-1 flex-col md:flex-row">
                
                <div 
                    className={`absolute md:relative bg-white shadow-md md:shadow-none w-64 min-h-screen p-4 transition-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                >
                    <FamilyMenu onMenuSelect={(item) => { setActiveComponent(item); setIsMenuOpen(false); }} activeItem={activeComponent} />
                </div>

                <div className="flex-1 p-4 overflow-auto">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
};

export default Family;
