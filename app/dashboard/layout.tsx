'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidenav from '../components/Sidenav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        <Sidenav />
        
        <main className="flex-grow px-4 py-8 bg-gray-50 text-black">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
