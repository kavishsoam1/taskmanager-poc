'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidenav from '../components/Sidenav';

// Dashboard Box component
const DashboardBox = ({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) => {
  return (
    <div className={`rounded-lg shadow-md p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className="text-2xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const router = useRouter();
  
  // This would typically check for authentication state
  // For demo purposes, we'll skip actual authentication
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        <Sidenav />
        
        <main className="flex-grow px-4 py-8 bg-gray-50 text-black">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardBox 
            title="Total Users" 
            value="1,245" 
            icon="👥" 
            color="bg-blue-100" 
          />
          <DashboardBox 
            title="Revenue" 
            value="$34,567" 
            icon="💰" 
            color="bg-green-100" 
          />
          <DashboardBox 
            title="Active Projects" 
            value="28" 
            icon="📊" 
            color="bg-yellow-100" 
          />
          <DashboardBox 
            title="Tasks Completed" 
            value="312" 
            icon="✅" 
            color="bg-purple-100" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    {item % 2 === 0 ? '👤' : '📝'}
                  </div>
                  <div>
                    <p className="font-medium">Activity {item}</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span>Task {item}</span>
                  </div>
                  <span className="text-sm text-gray-500">Due in {item} days</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      </div>
      
      <Footer />
    </div>
  );
}
