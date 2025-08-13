'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Task manager. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-300">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-300">Terms of Service</a>
            <a href="#" className="hover:text-indigo-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
