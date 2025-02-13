import { useState } from "react";
import {
  FaBars,
  FaRegCalendarAlt,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDashboard, MdOutlineShoppingCart } from "react-icons/md";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  return (
    <div
      className={`h-screen bg-white shadow-lg ${
        open ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1 className={`text-xl font-bold text-black ${!open && "hidden"}`}>
          PropZone
        </h1>
        <FaBars
          className="cursor-pointer text-xl text-black"
          onClick={() => setOpen(!open)}
        />
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <button
              className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setDashboardOpen(!dashboardOpen)}
            >
              <MdDashboard className="text-xl" />
              {/* <div className="flex items-center justify-between w-full"> */}
                <span className={`ml-3 ${!open && "hidden"}`}>Dashboard</span>
                {/* <span>
                  {dashboardOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span> */}
              {/* </div> */}
            </button>
            {/* {dashboardOpen && open && (
              <ul className="ml-8 space-y-2">
                <li className="flex items-center p-2 text-gray-600 hover:text-black">
                  <MdOutlineShoppingCart className="text-lg" />
                  <span className="ml-2">Ecommerce</span>
                </li>
              </ul>
            )} */}
          </li>
          {/* Calendar */}
          <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
            <FaRegCalendarAlt className="text-xl" />
            <span className={`ml-3 ${!open && "hidden"}`}>Calendar</span>
          </li>
          {/* User Profile */}
          <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
            <FaUser className="text-xl" />
            <span className={`ml-3 ${!open && "hidden"}`}>User Profile</span>
          </li>
          {/* Forms */}
          <li className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md">
            <FaClipboardList className="text-xl" />
            <span className={`ml-3 ${!open && "hidden"}`}>Forms</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
