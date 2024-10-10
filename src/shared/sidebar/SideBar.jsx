import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Sidebar = ({ access, handleclick, menuItems }) => {
  return (
    <aside className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex flex-col h-full py-8 overflow-y-auto bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex items-center justify-center mb-10">
          <img src="/api/placeholder/160/40" alt="Logo" className="h-8" />
        </div>
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              item.access.includes(access) && (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-gray-600 rounded-lg transition-colors duration-150 ease-in-out ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' 
                          : 'hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </li>
              )
            ))}
          </ul>
        </nav>
        <div className="px-3 mt-auto">
          <button
            className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg transition-colors duration-150 ease-in-out hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={handleclick}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;