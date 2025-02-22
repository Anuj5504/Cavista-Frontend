import React from 'react'
import { Sidebar, TextInput } from "flowbite-react";
import { HiChartPie, HiClipboard, HiCollection, HiInformationCircle, HiLogin, HiPencil, HiSearch, HiShoppingBag, HiUsers } from "react-icons/hi";

const FamilyMember = () => {
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="[&>div]:bg-transparent [&>div]:p-0 my-5"
    >
      <div className="flex h-full flex-col justify-between py-4">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/" icon={HiChartPie}>
                My Health
              </Sidebar.Item>
              <Sidebar.Item href="/e-commerce/products" icon={HiShoppingBag}>
                Family Members
              </Sidebar.Item>
              <Sidebar.Item href="/users/list" icon={HiUsers}>
                Family Health
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                Sign out
              </Sidebar.Item>

            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              
              <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  )
}

export default FamilyMember
