import React from 'react';
import { Sidebar, TextInput } from "flowbite-react";
import { HiSearch, HiUsers, HiLogin, HiInformationCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const FamilyMenu = ({ activeItem }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/home'); 
    };

    return (
        <Sidebar aria-label="Family dashboard sidebar" className="bg-white p-0 h-full">
            <div className="flex h-full flex-col justify-between py-4">
                <div>
                    <form className="pb-3 md:hidden">
                        <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                    </form>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                href="#"
                                icon={HiUsers}
                                onClick={() => handleNavigation('/caregiver')}
                                active={activeItem === 'patients'}
                            >
                                Patient List
                            </Sidebar.Item>
                            {/* <Sidebar.Item
                                href="#"
                                icon={HiUsers}
                                active={activeItem === 'assign'}
                            >
                                Assign Tasks
                            </Sidebar.Item> */}
                            <Sidebar.Item href="#" icon={HiLogin} onClick={handleSignOut}>
                                Sign out
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiInformationCircle}>
                                Help
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </div>
            </div>
        </Sidebar>
    );
};

export default FamilyMenu;
