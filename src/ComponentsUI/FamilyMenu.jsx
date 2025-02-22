import React from 'react'
import { Sidebar, TextInput } from "flowbite-react";
import { HiChartPie, HiInformationCircle, HiLogin, HiSearch, HiUsers } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const FamilyMenu = ({ onMenuSelect, activeItem }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate('/home');
  };

  return (
    <Sidebar
      aria-label="Family dashboard sidebar"
      className="bg-white p-0 h-full"
    >
      <div className="flex h-full flex-col justify-between py-4">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={HiChartPie}
                onClick={() => onMenuSelect('dashboard')}
                active={activeItem === 'dashboard'}
              >
                My Health
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiUsers}
                onClick={() => onMenuSelect('members')}
                active={activeItem === 'members'}
              >
                Family Members
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiUsers}
                onClick={() => onMenuSelect('health')}
                active={activeItem === 'health'}
              >
                Family Health
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiUsers}
                onClick={() => onMenuSelect('connect')}
                active={activeItem === 'connect'}
              >
                Connect To Fitbit
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiLogin}
                onClick={handleLogout}
              >
                Sign out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiInformationCircle}
              >
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  )
}

export default FamilyMenu;
