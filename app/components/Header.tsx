'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 text-black shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Task Manager</h1>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/home" className="hover:text-indigo-200">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-200">
                Reports
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-200">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-indigo-200">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
