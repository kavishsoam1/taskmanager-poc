'use client';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line react-hooks/exhaustive-deps
/* eslint-disable */
import { useState, useEffect, useMemo } from 'react';
import { getAllTasks, getProcessVariables, Task, PROXY_API } from '../../utils/api';

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
  // Component state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [currentTaskDetails, setCurrentTaskDetails] = useState<Task | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
  const [_error, setError] = useState<string | null>(null);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);
  const [originalFormData, setOriginalFormData] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [approvalRequested, setApprovalRequested] = useState<boolean>(false);
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [processIdFilter, setProcessIdFilter] = useState<string>('');

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
  
  // Apply filters whenever tasks, statusFilter, or processIdFilter changes
  useEffect(() => {
    let result = [...tasks];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Apply process ID filter if not empty
    if (processIdFilter.trim()) {
      const searchTerm = processIdFilter.toLowerCase().trim();
      result = result.filter(task => 
        (task.id && task.id.toLowerCase().includes(searchTerm)) || 
        (task._id && task._id.toLowerCase().includes(searchTerm))
      );
    }
    
    setFilteredTasks(result);
  }, [tasks, statusFilter, processIdFilter]);
  
  // Get the selected task - look for _id (from API) or id (from sample data)
  const selectedTask = useMemo(() => {
    return filteredTasks.find(task => task._id === selectedTaskId || task.id === selectedTaskId) ||
           tasks.find(task => task._id === selectedTaskId || task.id === selectedTaskId);
  }, [filteredTasks, tasks, selectedTaskId]);
  
  // Polling for tasks - refresh every 30 seconds
  useEffect(() => {
    const fetchTasksPolling = async () => {
      try {
        const fetchedTasks = await getAllTasks();
        if (fetchedTasks && fetchedTasks.length > 0) {
          // Keep track of the currently selected task to preserve its selection
          const currentSelected = selectedTaskId;
          
          // If we have a selected task, find its latest data in the fetched tasks
          if (currentSelected) {
            const updatedSelectedTask = fetchedTasks.find(t => 
              t._id === currentSelected || t.id === currentSelected
            );
            
            // If the selected task still exists in the fetched data, preserve its details
            if (updatedSelectedTask) {
              // Update the tasks list but preserve our selected task's current state
              setTasks(prevTasks => {
                return fetchedTasks.map(newTask => {
                  // For the selected task, keep form data and states unchanged
                  if (newTask._id === currentSelected || newTask.id === currentSelected) {
                    const existingTask = prevTasks.find(t => 
                      t._id === currentSelected || t.id === currentSelected
                    );
                    
                    // Merge with existing task to keep current state if it exists
                    if (existingTask) {
                      return {
                        ...newTask,
                        // Preserve UI state fields that shouldn't be lost during refresh
                        status: existingTask.status, // Keep the current status
                        name: existingTask.name,
                        age: existingTask.age,
                        gender: existingTask.gender,
                        address: existingTask.address,
                        aadharNo: existingTask.aadharNo,
                        // CRITICAL: Always preserve the correlationId if it exists
                        correlationId: existingTask.correlationId || newTask.correlationId,
                      };
                    }
                  }
                  return newTask;
                });
              });
            } else {
              // If the selected task is no longer in the list, update as normal
              setTasks(fetchedTasks);
            }
          } else {
            // No task is selected, just update the list
            setTasks(fetchedTasks);
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };
    
    // Set up polling interval
    const intervalId = setInterval(fetchTasksPolling, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedTaskId]); // Add selectedTaskId as dependency
  
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
    // If already selecting the same task and we're in edit mode,
    // don't reset form data to avoid losing changes during polling
    if (taskId === selectedTaskId && isEditing) {
      return; // Don't reset form or re-fetch data for the same task while editing
    }
    
    setSelectedTaskId(taskId);
    setIsLoadingDetails(true);
    
    // Only reset form states when selecting a new task
    if (taskId !== selectedTaskId) {
      setIsRejected(false);
      setIsEditing(false);
      setIsEditEnabled(false);
      setOriginalFormData(null);
      setFormData(null);
      setApprovalRequested(false);
    }
    
    try {
      // Find the task with the selected ID to get its processInstanceKey
      const task = tasks.find(t => t._id === taskId || t.id === taskId);
      
      if (task?.processInstanceKey) {
        console.log(`Fetching variables for process instance ${task.processInstanceKey}`);
        
        // Fetch variables for the selected process instance
        const variables = await getProcessVariables(task.processInstanceKey);
        
        if (variables) {
          console.log('Process variables:', variables);
          
          // Check if the task was rejected based on the isRejected flag from our API
          const wasRejected = variables.isRejected || false;
          
          // Check if approval is requested
          const isApprovalRequested = variables.approvalRequested || false;
          setApprovalRequested(isApprovalRequested);
          
          console.log('Approval requested:', isApprovalRequested);
          
          if (wasRejected) {
            console.log('This task was rejected - detected from API response');
          }
          
          // Initialize task data from variables
          let taskData = {
            ...task,
            name: variables.name || 'N/A',
            age: String(variables.age || ''),
            gender: variables.gender || '',
            address: variables.address || '',
            aadharNo: variables.aadhaar || '',
            correlationId: variables.correlationId
          };
          
          // Initialize form data
          let formData = {
            name: variables.name || 'N/A',
            age: String(variables.age || ''),
            gender: variables.gender || '',
            address: variables.address || '',
            aadhaar: variables.aadhaar || ''
          };
          
          // Check for completed task with approve="true" and map data from editedData if exists
          // Define interface for variable item structure
          interface VariableItem {
            key: number;
            processInstanceKey: number;
            scopeKey: number;
            name: string;
            value: string;
            truncated: boolean;
            tenantId: string;
          }
          
          if (variables && Array.isArray(variables.items)) {
            console.log('Found items array in variables, checking for approve=true');
            
            // Find the approve variable
            const approveVar = variables.items.find((v: VariableItem) => v.name === 'approve');
            
            // Check if approve value is "true" (as a JSON string)
            if (approveVar && approveVar.value === '"true"') {
              console.log('Found approve="true" in variables');
              
              // First look for individual name, age, etc. fields that may be updated
              const updatedName = variables.items.find((v: VariableItem) => v.name === 'name');
              const updatedAge = variables.items.find((v: VariableItem) => v.name === 'age');
              const updatedGender = variables.items.find((v: VariableItem) => v.name === 'gender');
              const updatedAddress = variables.items.find((v: VariableItem) => v.name === 'address');
              const updatedAadhaar = variables.items.find((v: VariableItem) => v.name === 'aadhaar');
              
              // If we have these individual fields, use them directly
              if (updatedName || updatedAge || updatedGender || updatedAddress || updatedAadhaar) {
                console.log('Using individual field updates');
                
                // Extract values and remove quotes if present
                const getName = (val: string) => {
                  if (val.startsWith('"') && val.endsWith('"')) {
                    return val.substring(1, val.length - 1);
                  }
                  return val;
                };
                
                // Update taskData with the new values
                taskData = {
                  ...taskData,
                  name: updatedName ? getName(updatedName.value) : taskData.name,
                  age: updatedAge ? String(updatedAge.value) : taskData.age,
                  gender: updatedGender ? getName(updatedGender.value) : taskData.gender,
                  address: updatedAddress ? getName(updatedAddress.value) : taskData.address,
                  aadharNo: updatedAadhaar ? getName(updatedAadhaar.value) : taskData.aadharNo
                };
                
                // Update formData as well
                formData = {
                  name: updatedName ? getName(updatedName.value) : formData.name,
                  age: updatedAge ? String(updatedAge.value) : formData.age,
                  gender: updatedGender ? getName(updatedGender.value) : formData.gender,
                  address: updatedAddress ? getName(updatedAddress.value) : formData.address,
                  aadhaar: updatedAadhaar ? getName(updatedAadhaar.value) : formData.aadhaar
                };
              }
              
              // As a fallback, also check for editedData if available
              const editedDataVar = variables.items.find((v: VariableItem) => v.name === 'editedData');
              if (editedDataVar && editedDataVar.value) {
                try {
                  console.log('Found editedData, parsing...');
                  const parsedData = JSON.parse(editedDataVar.value);
                  
                  // Extract the variables from the request body
                  if (parsedData.request && parsedData.request.body && parsedData.request.body.variables) {
                    const editedData = parsedData.request.body.variables;
                    console.log('Extracted edited data:', editedData);
                    
                    // Map edited data to task (if not already set by individual fields)
                    taskData = {
                      ...taskData,
                      name: editedData.name || taskData.name,
                      age: String(editedData.age || taskData.age),
                      gender: editedData.gender || taskData.gender,
                      address: editedData.address || taskData.address,
                      aadharNo: editedData.aadhaar || taskData.aadharNo
                    };
                    
                    // Update form data as well
                    formData = {
                      name: editedData.name || formData.name,
                      age: String(editedData.age || formData.age),
                      gender: editedData.gender || formData.gender,
                      address: editedData.address || formData.address,
                      aadhaar: editedData.aadhaar || formData.aadhaar
                    };
                  } else {
                    console.warn('editedData does not contain expected structure with request.body.variables');
                  }
                } catch (e) {
                  console.error('Error parsing editedData:', e);
                }
              }
            }
          } else if (variables) {
            // Check in non-array structure if approve exists and is true
            if (variables.approve === 'true' || variables.approve === true || variables.approve === '"true"') {
              console.log('Task was approved (non-array format), checking for editedData');
              if (variables.editedData) {
                try {
                  // Try to parse if it's a string, otherwise use directly
                  const editedData = typeof variables.editedData === 'string' 
                    ? JSON.parse(variables.editedData) 
                    : variables.editedData;
                  
                  // Extract the edited fields
                  const editedFields = editedData.request?.body?.variables || editedData;
                  
                  // Map edited data to task
                  taskData = {
                    ...taskData,
                    name: editedFields.name || taskData.name,
                    age: String(editedFields.age || taskData.age),
                    gender: editedFields.gender || taskData.gender,
                    address: editedFields.address || taskData.address,
                    aadharNo: editedFields.aadhaar || taskData.aadharNo
                  };
                  
                  // Update form data as well
                  formData = {
                    name: editedFields.name || formData.name,
                    age: String(editedFields.age || formData.age),
                    gender: editedFields.gender || formData.gender,
                    address: editedFields.address || formData.address,
                    aadhaar: editedFields.aadhaar || formData.aadhaar
                  };
                } catch (e) {
                  console.error('Error processing editedData:', e);
                }
              }
            }
          }
          
          // Store the original data and set form data
          // If we have editedData and approval is requested, use the edited data for form fields
          if (variables.approvalRequested && variables.editedData) {
            try {
              // Try to parse if it's a string, otherwise use directly
              const editedData = typeof variables.editedData === 'string' 
                ? JSON.parse(variables.editedData) 
                : variables.editedData;
              
              // Extract the edited fields
              const editedFields = editedData.request?.body?.variables || editedData;
              
              // Update form data with edited values
              formData = {
                name: editedFields.name || formData.name,
                age: String(editedFields.age || formData.age),
                gender: editedFields.gender || formData.gender,
                address: editedFields.address || formData.address,
                aadhaar: editedFields.aadhaar || formData.aadhaar
              };
              console.log('Using edited data for form fields:', formData);
            } catch (e) {
              console.error('Error processing editedData during approval request:', e);
            }
          }
          
          setOriginalFormData(formData);
          setFormData({...formData});
          setIsRejected(wasRejected);
          
          // Update the task with data from the variables
          setTasks(prevTasks =>
            prevTasks.map(t =>
              (t._id === taskId || t.id === taskId)
                ? taskData
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
      
      // Update UI regardless of API response - ensure correlationId is preserved
      setTasks(prevTasks => 
        prevTasks.map(t => 
          (t.id === taskId || t._id === taskId) 
            ? { 
                ...t, 
                status: 'approved',
                // Explicitly preserve the correlationId
                correlationId: t.correlationId || task.correlationId
              } 
            : t
        )
      );
      
      // Store the task with correlationId in currentTaskDetails for reference
      setCurrentTaskDetails(task);
      
      console.log('Approval successfully sent to Camunda');
      alert('Task approved successfully!');
      
      // Helper function to delay execution
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      // Refetch the process variables after a delay to allow backend processing
      if (task.processInstanceKey) {
        console.log(`Waiting 3 seconds before refetching variables...`);
        try {
          // Wait for 3 seconds before fetching to allow backend to process
          await delay(3000);
          
          console.log(`Refetching variables for process instance ${task.processInstanceKey} after approval`);
          const updatedVariables = await getProcessVariables(task.processInstanceKey);
          if (updatedVariables) {
            console.log('Updated process variables after approval:', updatedVariables);
            
            // Update UI state with new data
            setApprovalRequested(updatedVariables.approvalRequested || false);
            setIsRejected(updatedVariables.isRejected || false);
            
            // Update task data with the latest values if needed
            if (updatedVariables.editedData) {
              // Extract edited data and update form if necessary
              // Similar to handleTaskSelect logic
              let formData = {
                name: updatedVariables.name || '',
                age: String(updatedVariables.age || ''),
                gender: updatedVariables.gender || '',
                address: updatedVariables.address || '',
                aadhaar: updatedVariables.aadhaar || ''
              };
              
              setFormData(formData);
              setOriginalFormData(formData);
            }
          }
        } catch (err) {
          console.error('Error refetching process variables after approval:', err);
        }
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
      
      // Update UI regardless of API response - ensure correlationId is preserved
      setTasks(prevTasks => 
        prevTasks.map(t => 
          (t.id === taskId || t._id === taskId) 
            ? { 
                ...t, 
                status: 'rejected',
                // Explicitly preserve the correlationId
                correlationId: t.correlationId || task.correlationId
              } 
            : t
        )
      );
      
      // Store the task with correlationId in currentTaskDetails for reference
      setCurrentTaskDetails(task);
      setIsRejected(true);
      
      console.log('Rejection successfully sent to Camunda');
      alert('Task rejected successfully!');
      
      // Helper function to delay execution
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      // Refetch the process variables after a delay to allow backend processing
      if (task.processInstanceKey) {
        console.log(`Waiting 3 seconds before refetching variables...`);
        try {
          // Wait for 3 seconds before fetching to allow backend to process
          await delay(3000);
          
          console.log(`Refetching variables for process instance ${task.processInstanceKey} after rejection`);
          const updatedVariables = await getProcessVariables(task.processInstanceKey);
          if (updatedVariables) {
            console.log('Updated process variables after rejection:', updatedVariables);
            
            // Update UI state with new data
            setApprovalRequested(updatedVariables.approvalRequested || false);
            // Note: we already set isRejected to true above, but update from API as well
            setIsRejected(updatedVariables.isRejected || true);
            
            // If we have edited data after rejection, update the form
            if (updatedVariables.editedData) {
              let formData = {
                name: updatedVariables.name || '',
                age: String(updatedVariables.age || ''),
                gender: updatedVariables.gender || '',
                address: updatedVariables.address || '',
                aadhaar: updatedVariables.aadhaar || ''
              };
              
              setFormData(formData);
              setOriginalFormData(formData);
            }
          }
        } catch (err) {
          console.error('Error refetching process variables after rejection:', err);
        }
      }
      
    } catch (err) {
      console.error('Error rejecting task:', err);
      alert('Failed to reject task. Please try again.');
    }
  };
  
  // Validation functions
  const validateFormData = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name || !formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (parseInt(formData.age) <= 0) {
      errors.age = 'Age must be a positive number';
    }
    
    if (!formData.gender) {
      errors.gender = 'Please select a gender';
    }
    
    if (!formData.address || !formData.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!formData.aadhaar) {
      errors.aadhaar = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadhaar)) {
      errors.aadhaar = 'Aadhar number must be 12 digits';
    }
    
    return errors;
  };

  // Handle edit submission
  const handleEditSubmit = async () => {
    if (!selectedTaskId || !formData) return;
    
    // Validate form before submission
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length > 0) {
      // Display validation errors
      alert(Object.values(validationErrors).join('\n'));
      return;
    }
    
    try {
      // First, check the currently selected task in the tasks array
      let task = tasks.find(t => t._id === selectedTaskId || t.id === selectedTaskId);
      
      // If no correlationId is found, try to get it from currentTaskDetails which we stored during rejection
      if (!task?.correlationId && currentTaskDetails?.correlationId) {
        console.log('Using correlationId from currentTaskDetails');
        if (task) {
          // Just add the correlationId to existing task
          task = {
            ...task,
            correlationId: currentTaskDetails.correlationId
          };
        } else if (currentTaskDetails) {
          // If we have no task but we do have currentTaskDetails, use that
          task = currentTaskDetails;
        }
      }
      
      // Final check to make sure we have a correlationId before proceeding
      if (!task?.correlationId) {
        console.warn('Task is missing correlationId, cannot send to Camunda');
        alert('This task has no correlationId. Please try again.');
        return;
      }
      
      console.log('Sending edit submission to Camunda:', formData);
      
      // Prepare the payload for edit resubmit
      const editPayload = {
        variables: {
          name: formData.name,
          age: parseInt(formData.age, 10) || 0,
          gender: formData.gender,
          address: formData.address,
          aadhaar: formData.aadhaar
        },
        correlationId: task.correlationId
      };
      
      // Call the edit_resubmit API via our proxy
      const response = await fetch(PROXY_API.editResubmit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editPayload)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to send edit: ${response.status}`);
      }
      
      // Update the UI with edited data
      setTasks(prevTasks => 
        prevTasks.map(t => 
          (t.id === selectedTaskId || t._id === selectedTaskId) 
            ? { 
                ...t, 
                name: formData.name,
                age: String(formData.age),
                gender: formData.gender,
                address: formData.address,
                aadharNo: formData.aadhaar,
                status: 'pending' // Set status back to pending after edit
              } 
            : t
        )
      );
      
      // Reset editing state
      setIsEditing(false);
      setIsEditEnabled(false);
      setIsRejected(false);
      
      console.log('Edit successfully sent to Camunda');
      alert('Request edited and resubmitted successfully!');
      
    } catch (err) {
      console.error('Error submitting edit:', err);
      alert('Failed to submit edit. Please try again.');
    }
  };

  // Handle cancel edit button
  const handleCancelEdit = () => {
    // Reset form data to original values
    setFormData(originalFormData ? {...originalFormData} : null);
    setIsEditing(false);
    setIsEditEnabled(false);
  };
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Task Requests</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Task list */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Task Requests</h2>
          </div>
          
          {/* Filter controls */}
          <div className="p-4 border-b bg-gray-50">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Filter</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Process ID</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                placeholder="Search by ID..."
                value={processIdFilter}
                onChange={(e) => setProcessIdFilter(e.target.value)}
              />
            </div>
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
            ) : (
              <ul className="divide-y">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <li
                      key={task.id || task._id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedTaskId === (task.id || task._id) ? 'bg-blue-50' : ''}`}
                      onClick={() => handleTaskSelect(task.id || task._id)}
                    >
                      <h3 className="font-medium">{task.name}</h3>
                      <p className="text-sm text-gray-500">ID: {((task._id || task.id) || '').substring(0, 8)}...</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">{formatDate(task.dateSubmitted)}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : task.status === 'approved' ? 'bg-green-100 text-green-800' : task.status == 'completed' ? 'bg-green-100 text-green-800' : task.status == 'rejected' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-center text-gray-500">
                    No tasks match your filters
                  </li>
                )}
              </ul>
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
                      className={`w-full p-2 border ${isEditing ? 'border-blue-300' : 'border-gray-300'} rounded-md ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                      value={isEditing ? formData?.name : selectedTask.name}
                      readOnly={!isEditing}
                      onChange={(e) => {
                        if (isEditing) {
                          setFormData({...formData, name: e.target.value});
                          setIsEditEnabled(true);
                        }
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      className={`w-full p-2 border ${isEditing ? 'border-blue-300' : 'border-gray-300'} rounded-md ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                      value={isEditing ? formData?.age : selectedTask.age}
                      readOnly={!isEditing}
                      min="1"
                      onChange={(e) => {
                        if (isEditing) {
                          setFormData({...formData, age: e.target.value});
                          setIsEditEnabled(true);
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  {isEditing ? (
                    <select
                      className={`w-full p-2 border border-blue-300 rounded-md bg-white`}
                      value={formData?.gender || ''}
                      onChange={(e) => {
                        setFormData({...formData, gender: e.target.value});
                        setIsEditEnabled(true);
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      value={selectedTask.gender}
                      readOnly
                    />
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    className={`w-full p-2 border ${isEditing ? 'border-blue-300' : 'border-gray-300'} rounded-md ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                    rows={3}
                    value={isEditing ? formData?.address : selectedTask.address}
                    readOnly={!isEditing}
                    onChange={(e) => {
                      if (isEditing) {
                        setFormData({...formData, address: e.target.value});
                        setIsEditEnabled(true);
                      }
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    className={`w-full p-2 border ${isEditing ? 'border-blue-300' : 'border-gray-300'} rounded-md ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                    value={isEditing ? formData?.aadhaar : selectedTask.aadharNo}
                    readOnly={!isEditing}
                    maxLength={12}
                    pattern="\d{12}"
                    onChange={(e) => {
                      if (isEditing) {
                        setFormData({...formData, aadhaar: e.target.value});
                        setIsEditEnabled(true);
                      }
                    }}
                  />
                  {isEditing && <p className="text-xs text-gray-500 mt-1">Must be exactly 12 digits</p>}
                </div>
                
                <div className="pt-4 border-t flex justify-between">
                  {/* Status tags */}
                  <div>
                    {(selectedTask.status === 'rejected' || isRejected) && !isEditing && (
                      <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-md">
                        Request Rejected
                      </span>
                    )}
                    {isEditing && (
                      <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-md">
                        Editing Request
                      </span>
                    )}
                    {selectedTask.status === 'approved' && !isRejected && (
                      <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-md">
                        Request Approved
                      </span>
                    )}
                    {selectedTask.status === 'completed' && !isRejected && (
                      <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md">
                        Task Completed
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    {((selectedTask.status === 'pending' && !isRejected) || approvalRequested) && !isEditing ? (
                      <>
                        <button
                          type="button"
                          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
                          onClick={handleApprove}
                        >
                          {approvalRequested ? 'Approve Changes' : 'Approve Request'}
                        </button>
                        <button
                          type="button"
                          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
                          onClick={handleReject}
                        >
                          {approvalRequested ? 'Reject Changes' : 'Reject Request'}
                        </button>
                      </>
                    ) : (selectedTask.status === 'rejected' || isRejected) && !isEditing ? (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Request
                        </button>
                        <button
                          type="button"
                          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md"
                          onClick={() => {}}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : isEditing ? (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className={`${isEditEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'} text-white font-medium py-2 px-4 rounded-md`}
                          onClick={handleEditSubmit}
                          disabled={!isEditEnabled}
                        >
                          Submit Edit
                        </button>
                        <button
                          type="button"
                          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : null}
                  </div>
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
