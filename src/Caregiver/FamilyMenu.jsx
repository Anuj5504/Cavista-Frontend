import React from 'react'
import { Sidebar, TextInput } from "flowbite-react";
import { HiChartPie, HiInformationCircle, HiLogin, HiSearch, HiUsers } from "react-icons/hi";

const FamilyMenu = ({ onMenuSelect, activeItem }) => {
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
                                icon={HiUsers}
                                onClick={() => onMenuSelect('health')}
                                active={activeItem === 'health'}
                            >
                                Patient List
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="#"
                                icon={HiUsers}
                                onClick={() => onMenuSelect('health')}
                                active={activeItem === 'assign'}
                            >
                                Assign Tasks
                            </Sidebar.Item>
                            <Sidebar.Item
                                href="#"
                                icon={HiUsers}
                                onClick={() => onMenuSelect('health')}
                                active={activeItem === 'update'}
                            >
                                Update Profile
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiLogin}>
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
    )
}

export default FamilyMenu;