'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  icon: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'New Task', icon: '✚', href: '/dashboard/task/new' },
  { label: 'Requests', icon: '📋', href: '/dashboard/requests' },
  { label: 'Profile', icon: '👤', href: '/dashboard/profile' },
];

export default function Sidenav() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidenav = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside 
      className={`bg-white text-black transition-all shadow-md duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-16'
      } min-h-[calc(100vh-64px)] flex flex-col`}
    >
      <div className="p-4 flex justify-end">
        <button 
          onClick={toggleSidenav} 
          className="text-black p-1 hover:bg-gray-700 rounded-md focus:outline-none"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? '◀' : '▶'}
        </button>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.href}
                className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <span className="text-lg">{item.icon}</span>
                {isExpanded && (
                  <span className="ml-3 transition-opacity duration-200">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        {isExpanded ? (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm">
              U
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-gray-400">user@example.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm">
              U
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
