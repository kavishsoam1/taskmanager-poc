'use client';

import React, { useState, useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
};

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 2000,
}) => {
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let progressInterval: NodeJS.Timeout | null = null;
    
    if (isVisible) {
      setProgress(100);
      
      // Update progress bar every 20ms
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (20 / duration) * 100;
          return newProgress < 0 ? 0 : newProgress;
        });
      }, 20);
      
      // Close toast after duration
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isVisible, duration, onClose]);
  
  if (!isVisible) return null;
  
  const typeClasses = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
  };
  
  const progressClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };
  
  return (
    <div className="fixed top-5 left-5 z-50 max-w-sm">
      <div className={`border-l-4 p-4 shadow-md rounded-r-lg ${typeClasses[type]}`}>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-900"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${progressClasses[type]} h-1.5 rounded-full transition-all duration-100 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
