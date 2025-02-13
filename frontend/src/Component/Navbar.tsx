import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotifOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-md">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search or type command..."
          className="p-2 pl-10 border rounded-lg w-80 text-sm bg-gray-100"
        />
      </div>

      {/* Icons & Profile */}
      <div className="flex items-center space-x-6">
        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative">
            <FaBell className="text-xl text-black" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-3 h-3 flex items-center justify-center rounded-full">
              !
            </span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-4">
              <p className="text-sm text-gray-600">No new notifications</p>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2"
          >
            <Image
              height={30}
              width={30}
              src="/images/user/user-01.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-black">Emirhan Boruch</span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-4">
              <p className="text-sm text-gray-600">Profile Settings</p>
              <button className="w-full mt-2 p-2 bg-red-500 text-white rounded-lg">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
