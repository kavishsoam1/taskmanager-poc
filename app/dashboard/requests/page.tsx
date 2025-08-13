'use client';

import { useState, useEffect } from 'react';
import { getAllTasks, updateTaskStatus, Task } from '../../utils/api';

// Use Task type from API utilities

// Sample task data for initial UI rendering while API loads
const sampleTasks: Task[] = [
  {
    id: '1',
    name: 'Rahul Singh',
    age: '32',
    gender: 'male',
    address: '123 Main St, Apartment 4B, New York, NY 10001',
    aadharNo: '123456789012',
    status: 'pending',
    dateSubmitted: '2025-08-10',
  },
  {
    id: '2',
    name: 'Kavish Soam',
    age: '28',
    gender: 'male',
    address: '456 Park Avenue, Suite 7C, New York, NY 10022',
    aadharNo: '987654321098',
    status: 'pending',
    dateSubmitted: '2025-08-11',
  }
];

export default function RequestsPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch tasks from API on component mount
  useEffect(() => {
    async function fetchTasks() {
      try {
        setIsLoading(true);
        const fetchedTasks = await getAllTasks();
        if (fetchedTasks && fetchedTasks.length > 0) {
          setTasks(fetchedTasks);
          // Select the first task by default if none is selected
          if (!selectedTaskId && fetchedTasks.length > 0) {
            const firstTaskId = fetchedTasks[0].id || fetchedTasks[0]._id;
            if (firstTaskId) {
              setSelectedTaskId(firstTaskId);
            }
          }
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks. Using sample data instead.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTasks();
  }, []);
  
  // Get the selected task - look for _id (from API) or id (from sample data)
  const selectedTask = tasks.find(task => task._id === selectedTaskId || task.id === selectedTaskId);
  
  // Handle task selection
  const handleTaskSelect = (taskId: any) => {
    setSelectedTaskId(taskId);
  };
  
  // Handle task approval
  const handleApprove = async () => {
    if (!selectedTaskId) return;
    
    try {
      // Make sure we have a valid task ID for the API call
      const taskId = selectedTaskId;
      const updatedTask = await updateTaskStatus(taskId, 'approved');
      
      if (updatedTask) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            (task.id === taskId || task._id === taskId) 
              ? { ...task, status: 'approved' } 
              : task
          )
        );
      }
    } catch (err) {
      console.error('Error approving task:', err);
      alert('Failed to approve task. Please try again.');
    }
  };
  
  // Handle task rejection
  const handleReject = async () => {
    if (!selectedTaskId) return;
    
    try {
      // Make sure we have a valid task ID for the API call
      const taskId = selectedTaskId;
      const updatedTask = await updateTaskStatus(taskId, 'rejected');
      
      if (updatedTask) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            (task.id === taskId || task._id === taskId)
              ? { ...task, status: 'rejected' } 
              : task
          )
        );
      }
    } catch (err) {
      console.error('Error rejecting task:', err);
      alert('Failed to reject task. Please try again.');
    }
  };
  
  // Handle task completion
  const handleComplete = async () => {
    if (!selectedTaskId) return;
    
    try {
      // Make sure we have a valid task ID for the API call
      const taskId = selectedTaskId;
      const updatedTask = await updateTaskStatus(taskId, 'completed');
      
      if (updatedTask) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            (task.id === taskId || task._id === taskId)
              ? { ...task, status: 'completed' } 
              : task
          )
        );
      }
    } catch (err) {
      console.error('Error completing task:', err);
      alert('Failed to complete task. Please try again.');
    }
  };
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Task Requests</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Task list */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Open Tasks</h2>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
            {tasks.map(task => (
              <div 
                key={task._id || task.id} 
                className={`p-4 border-b cursor-pointer transition-colors ${
                  selectedTaskId === (task._id || task.id) 
                    ? 'bg-indigo-50 border-l-4 border-l-indigo-500' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTaskSelect(task._id || task.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{task.name}</h3>
                    <p className="text-sm text-gray-500">Submitted on {task.dateSubmitted}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : task.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : task.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - Task form */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6">
          {selectedTask ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Review Task Details</h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      value={selectedTask.name}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      value={selectedTask.age}
                      readOnly
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                    value={selectedTask.gender}
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                    rows={3}
                    value={selectedTask.address}
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                    value={selectedTask.aadharNo}
                    readOnly
                  />
                </div>
                
                <div className="pt-4 border-t flex justify-end">
                  {selectedTask.status === 'pending' ? (
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
                        onClick={handleApprove}
                      >
                        Approve Request
                      </button>
                      <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
                        onClick={handleReject}
                      >
                        Reject Request
                      </button>
                    </div>
                  ) : selectedTask.status === 'rejected' ? (
                    <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-md">
                      Request Rejected
                    </span>
                  ) : selectedTask.status === 'approved' ? (
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                      onClick={handleComplete}
                    >
                      Complete Task
                    </button>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md">
                      Task Completed
                    </span>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Select a task from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
