'use client';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-6 mt-auto shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left font-medium">
              &copy; {new Date().getFullYear()} Camunda Task manager. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="hover:text-blue-300 transition-colors duration-200 text-gray-200 border-b border-transparent hover:border-blue-300 pb-0.5"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="hover:text-blue-300 transition-colors duration-200 text-gray-200 border-b border-transparent hover:border-blue-300 pb-0.5"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="hover:text-blue-300 transition-colors duration-200 text-gray-200 border-b border-transparent hover:border-blue-300 pb-0.5"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
