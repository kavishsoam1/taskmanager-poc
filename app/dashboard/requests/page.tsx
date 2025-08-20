'use client';

import { useState, useEffect } from 'react';
import { getAllTasks, getProcessVariables, updateTaskStatus, Task } from '../../utils/api';

// Use Task type from API utilities

// Sample task data for initial UI rendering while API loads
const sampleTasks: Task[] = [
  {
    id: '1',
    name: 'Loading...',
    age: '',
    gender: '',
    address: '',
    aadharNo: '',
    status: 'pending',
    dateSubmitted: new Date().toISOString(),
  }
];

export default function RequestsPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
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
  
  // Helper function to format dates
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };
  
  // Handle task selection and fetch process variables
  const handleTaskSelect = async (taskId: any) => {
    setSelectedTaskId(taskId);
    setIsLoadingDetails(true);
    
    try {
      // Find the task with the selected ID to get its processInstanceKey
      const task = tasks.find(t => t._id === taskId || t.id === taskId);
      
      if (task?.processInstanceKey) {
        console.log(`Fetching variables for process instance ${task.processInstanceKey}`);
        
        // Fetch variables for the selected process instance
        const variables = await getProcessVariables(task.processInstanceKey);
        
        if (variables) {
          console.log('Process variables:', variables);
          
          // Update the task with data from the variables
          setTasks(prevTasks =>
            prevTasks.map(t =>
              (t._id === taskId || t.id === taskId)
                ? {
                    ...t,
                    name: variables.name || 'N/A',
                    age: String(variables.age || ''),
                    gender: variables.gender || '',
                    address: variables.address || '',
                    aadharNo: variables.aadhaar || '',
                    correlationId: variables.correlationId
                  }
                : t
            )
          );
        }
      }
    } catch (error) {
      console.error('Error fetching process variables:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };
  
  // Handle task approval
  const handleApprove = async () => {
    if (!selectedTaskId) return;
    
    try {
      // Make sure we have a valid task ID for the API call
      const taskId = selectedTaskId;
      const task = tasks.find(t => t._id === taskId || t.id === taskId);
      
      // Only proceed if we have a correlationId
      if (!task?.correlationId) {
        console.warn('Task is missing correlationId, cannot send to Camunda');
        alert('This task has no correlationId. Please select the task again to load details or try another task.');
        return;
      }
      
      // Prepare the exact payload structure for approval webhook
      const approvalPayload = {
        correlationId: task.correlationId,
          approve: "true",
      };
      
      console.log('Sending approval payload to Camunda:', approvalPayload);
      
      // Call the approval webhook directly via our proxy
      const response = await fetch('/api/proxy/camunda-approval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(approvalPayload)
      });

      if (!response.ok) {
        throw new Error(`Failed to send approval: ${response.status}`);
      }
      
      // Update UI regardless of API response
      setTasks(prevTasks => 
        prevTasks.map(t => 
          (t.id === taskId || t._id === taskId) 
            ? { ...t, status: 'approved' } 
            : t
        )
      );
      
      console.log('Approval successfully sent to Camunda');
      alert('Task approved successfully!');
      
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
      const task = tasks.find(t => t._id === taskId || t.id === taskId);
      
      // Only proceed if we have a correlationId
      if (!task?.correlationId) {
        console.warn('Task is missing correlationId, cannot send to Camunda');
        alert('This task has no correlationId. Please select the task again to load details or try another task.');
        return;
      }
      
      // Prepare the exact payload structure for rejection webhook
      const rejectionPayload = {
        correlationId: task.correlationId,
        approve: "false"
      };
      
      console.log('Sending rejection payload to Camunda:', rejectionPayload);
      
      // Call the rejection webhook directly via our proxy
      const response = await fetch('/api/proxy/camunda-approval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rejectionPayload)
      });

      if (!response.ok) {
        throw new Error(`Failed to send rejection: ${response.status}`);
      }
      
      // Update UI regardless of API response
      setTasks(prevTasks => 
        prevTasks.map(t => 
          (t.id === taskId || t._id === taskId) 
            ? { ...t, status: 'rejected' } 
            : t
        )
      );
      
      console.log('Rejection successfully sent to Camunda');
      alert('Task rejected successfully!');
      
    } catch (err) {
      console.error('Error rejecting task:', err);
      alert('Failed to reject task. Please try again.');
    }
  };
  
  // Note: handleComplete has been removed as status is now determined by the API response
  
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
            {isLoading ? (
              <div className="p-4 flex justify-center">
                <div className="animate-pulse flex flex-col items-center w-full">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No tasks available
              </div>
            ) : (
              tasks.map(task => (
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
                      <p className="text-sm text-gray-500">Process ID: {task._id || task.id}</p>
                      <p className="text-sm text-gray-500">Submitted: {new Date(task.dateSubmitted || '').toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      {/* Display correlationId if available */}
                      {task.correlationId && (
                        <p className="text-xs text-gray-500 mb-1">
                          Correlation ID: {task.correlationId.substring(0, 8)}...
                        </p>
                      )}
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
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Right side - Task form */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6">
          {selectedTask ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Review Task Details</h2>
              {isLoadingDetails ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : (
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
                    <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-md">
                      Request Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md">
                      Task Completed
                    </span>
                  )}
                </div>
              </form>
              )}
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
