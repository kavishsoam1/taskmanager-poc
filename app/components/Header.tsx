'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Camunda Task Manager</h1>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/home" className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">
                Reports
              </Link>
            </li>
            <li>
              <Link href="#" className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/login" className="px-3 py-2 bg-red-700 hover:bg-red-800 rounded-md transition-colors duration-200 font-medium">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
