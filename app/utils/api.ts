// API base URL - replace with actual URL when deployed
/* eslint-disable */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Zeebe API URL
const ZEEBE_API_URL = 'http://localhost:8080';

// Task type definition
export interface Task {
  _id?: string;
  id?: string;
  correlationId?: string;
  name: string;
  age: string;
  gender: string;
  address: string;
  aadharNo: string;
  pdfFilePath?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  dateSubmitted?: string;
  processInstanceKey?: string; // Added for Zeebe integration
}

// Process instance definition
export interface ProcessInstance {
  key: number;
  processVersion: number;
  bpmnProcessId: string;
  startTime: string; // Updated from startDate to match API response
  state: string;
  incident: boolean;
  processDefinitionKey: number;
  tenantId: string;
}

// Process variable definition
export interface ProcessVariable {
  key: number;
  processInstanceKey: number;
  scopeKey: number;
  name: string;
  value: string;
  truncated: boolean;
  tenantId: string;
}

// Camunda API configuration - Direct Access (not used with proxy)
export const CAMUNDA_API = {
  baseUrl: 'http://localhost:8085',
  inboundEndpoint: '/inbound/fcsrt1265',
  auth: {
    username: 'demo',
    password: 'demo'
  }
};

// Proxy API endpoints
export const PROXY_API = {
  camunda: '/api/proxy/camunda',
  camundaApproval: '/api/proxy/camunda-approval',
  camundaGetAllList: 'http://localhost:8085/inbound/getAllList',
  zeebeProcessInstances: '/api/proxy/zeebe-process-instances',
  zeebeVariables: '/api/proxy/zeebe-variables',
  editResubmit: '/api/proxy/edit-resubmit'
};

// Mock API for tasks (to be replaced with real API)
const MOCK_API = {
  tasks: [
    {
      _id: '1',
      id: '1', // Adding id for compatibility
      name: 'Rahul Singh',
      age: '32',
      gender: 'male',
      address: '123 Main St, Apartment 4B, New York, NY 10001',
      aadharNo: '123456789012',
      status: 'pending' as const,
      dateSubmitted: '2025-08-10',
    },
    {
      _id: '2',
      id: '2', // Adding id for compatibility
      name: 'Kavish Soam',
      age: '28',
      gender: 'male',
      address: '456 Park Avenue, Suite 7C, New York, NY 10022',
      aadharNo: '987654321098',
      status: 'pending' as const,
      dateSubmitted: '2025-08-11',
    },
    {
      _id: '3',
      id: '3', // Adding id for compatibility
      name: 'Ravi Kumar',
      age: '45',
      gender: 'male',
      address: '789 Broadway, Floor 12, New York, NY 10003',
      aadharNo: '456789012345',
      status: 'pending' as const,
      dateSubmitted: '2025-08-12',
    },
  ] as Task[]
};

// API Middleware for making HTTP requests
export const apiMiddleware = {
  // Generic request function
  request: async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
      // Set default headers
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // Create authorization header if needed
      if (url.includes(CAMUNDA_API.baseUrl)) {
        const authString = `${CAMUNDA_API.auth.username}:${CAMUNDA_API.auth.password}`;
        (headers as Record<string, string>)['Authorization'] = `Basic ${btoa(authString)}`;
      }

      // Make request
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle non-OK responses
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse JSON response
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // GET method
  get: <T>(url: string, options: Omit<RequestInit, 'method'> = {}): Promise<T> => {
    return apiMiddleware.request<T>(url, { ...options, method: 'GET' });
  },

  // POST method
  post: <T>(url: string, body: any, options: Omit<RequestInit, 'method' | 'body'> = {}): Promise<T> => {
    return apiMiddleware.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  // PUT method
  put: <T>(url: string, body: any, options: Omit<RequestInit, 'method' | 'body'> = {}): Promise<T> => {
    return apiMiddleware.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },
};

// Create a new task using Camunda API
export async function createTask(taskData: Omit<Task, 'id' | 'status' | 'dateSubmitted'>): Promise<any> {
  try {
    // Transform data to match Camunda API format
    const variables: Record<string, any> = {
      name: taskData.name,
      age: parseInt(taskData.age, 10),
      gender: taskData.gender,
      address: taskData.address,
      aadhaar: taskData.aadharNo,
    };
    
    // Only add document if PDF file exists
    if (taskData.pdfFilePath) {
      variables.document = taskData.pdfFilePath;
    }
    
    const camundaData = {
      variables
    };

    // Call Camunda API through our Next.js proxy to avoid CORS issues
    const response = await fetch(PROXY_API.camunda, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(camundaData)
    }).then(res => {
      if (!res.ok) {
        console.error('API error status:', res.status);
        throw new Error(`API error: ${res.status}`);
      }
      return res.json();
    });

    // For now, we'll also add it to our mock list for display
    const mockTask: Task = {
      _id: `mock-${Date.now()}`,
      id: `mock-${Date.now()}`, // Adding id for compatibility
      ...taskData,
      status: 'pending',
      dateSubmitted: new Date().toISOString(),
    };
    MOCK_API.tasks.push(mockTask);

    return response;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// Get all process instances from Zeebe API via proxy
export async function getAllProcessInstances(): Promise<Task[]> {
  try {
    // Call the Zeebe API through our proxy to get process instances
    const response = await fetch(PROXY_API.zeebeProcessInstances, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter: {
          bpmnProcessId: "workflow_2"
        },
        size: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch process instances: ${response.status}`);
    }

    const data = await response.json();
    
    // Map all process instances to tasks format
    const processInstances: ProcessInstance[] = data.items || [];
    
    // Filter out tasks with state ACTIVE and incident true
    const filteredInstances = processInstances.filter(instance => {
      return !(instance.state === 'ACTIVE' && instance.incident === true);
    });
      
    // Map filtered process instances to tasks format with proper status mapping
    return filteredInstances.map(instance => {
      // Determine status based on state and incident
      let status: 'pending' | 'approved' | 'rejected' | 'completed';
      if (instance.state === 'COMPLETED' && instance.incident === false) {
        status = 'completed'; // If state is COMPLETED and no incident, mark as completed
      } else if (instance.state === 'ACTIVE' && instance.incident === false) {
        status = 'pending'; // If state is ACTIVE and no incident, mark as pending
      } else {
        status = 'rejected'; // Any other combination (like having an incident) mark as rejected
      }
      
      // Create a basic task structure that matches the Task interface
      return {
        _id: instance.key.toString(),
        id: instance.key.toString(),
        name: `Process ${instance.key}`,
        age: '',  // Will be populated when task is selected
        gender: '',  // Will be populated when task is selected
        address: '',  // Will be populated when task is selected
        aadharNo: '',  // Will be populated when task is selected
        dateSubmitted: new Date(instance.startTime || Date.now()).toISOString(),
        status: status,
        processInstanceKey: instance.key.toString(),
        state: instance.state // Store the original state for reference
      };
    });
  } catch (error) {
    console.error('Error fetching process instances from Zeebe:', error);
    // Fallback to mock data if the API call fails
    return [...MOCK_API.tasks];
  }
}

// Get all tasks (maintains backward compatibility)
export async function getAllTasks(): Promise<Task[]> {
  return getAllProcessInstances();
}

// Get process variables by process instance key via proxy
export async function getProcessVariables(processInstanceKey: string, returnRawResponse: boolean = false): Promise<any> {
  try {
    // Call the Zeebe API through our proxy to get variables for a process instance
    const response = await fetch(PROXY_API.zeebeVariables, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter: {
          processInstanceKey: Number(processInstanceKey)
        },
        size: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch process variables: ${response.status}`);
    }

    const data = await response.json();
    
    // If returnRawResponse is true, return the entire data object
    if (returnRawResponse) {
      return data;
    }
    
    // Find the variables object in the response
    const variablesItem = data.items.find((item: ProcessVariable) => item.name === 'variables');
    
    // Check for approve item to see if it's approved
    const resultItem = data.items.find((item: ProcessVariable) => item.name === 'result');
    let isApproved = false;
    let isRejected = false;
    
    if (resultItem) {
      try {
        const resultValue = JSON.parse(resultItem.value);
        isApproved = resultValue.approve === 'true';
        isRejected = resultValue.approve === 'false';
      } catch (e) {
        console.error('Error parsing result item:', e);
      }
    }
    
    // Check for approval_requested flag
    const approvalRequestedItem = data.items.find((item: ProcessVariable) => item.name === 'approval_requested');
    const approvalRequested = approvalRequestedItem && approvalRequestedItem.value === 'true';
    
    // Get edited data from the editedData item
    let editedData = null;
    const editedDataItem = data.items.find((item: ProcessVariable) => item.name === 'editedData');
    
    if (editedDataItem && editedDataItem.value) {
      try {
        const parsedEditedData = JSON.parse(editedDataItem.value);
        if (parsedEditedData.request?.body?.variables) {
          editedData = parsedEditedData.request.body.variables;
          console.log('Found edited data:', editedData);
        }
      } catch (e) {
        console.error('Error parsing editedData:', e);
      }
    }
    
    if (!variablesItem) {
      throw new Error('Variables not found in response');
    }
    
    // Parse the variables value (it's a JSON string)
    try {
      const variables = JSON.parse(variablesItem.value);
      
      // Find the correlationId object
      const correlationIdItem = data.items.find((item: ProcessVariable) => item.name === 'correlationId');
      const correlationId = correlationIdItem ? JSON.parse(correlationIdItem.value) : null;
      
      // Prepare the data to return
      let resultData = { ...variables };
      
      // If we have edited data, use those values (regardless of approval status)
      if (editedData) {
        resultData = {
          ...resultData,
          name: editedData.name || variables.name,
          age: editedData.age || variables.age,
          gender: editedData.gender || variables.gender,
          address: editedData.address || variables.address,
          aadhaar: editedData.aadhaar || variables.aadhaar,
          aadharNo: editedData.aadhaar || variables.aadhaar // Support both spellings
        };
      }
      
      // Add approval status and correlation ID
      return {
        ...resultData,
        correlationId,
        isRejected,
        isApproved,
        approvalRequested  // Include the approval_requested flag to control button visibility
      };
    } catch (e) {
      console.error('Error parsing variables:', e);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching process variables for ${processInstanceKey}:`, error);
    return null;
  }
}

// Get task by ID (using mock data for now)
export async function getTaskById(taskId: string): Promise<Task> {
  const task = MOCK_API.tasks.find(t => t._id === taskId || t.id === taskId);
  
  if (!task) {
    throw new Error(`Task with ID ${taskId} not found`);
  }
  
  return Promise.resolve({...task});
}

// Send task approval to Camunda
export async function sendTaskApproval(
  correlationId: string, 
  approve: boolean, 
  message: string
): Promise<any> {
  try {
    // Prepare the payload for the approval webhook
    const payload = {
      correlationId,
      variables: {
        approve,
        message
      }
    };

    // Call the approval webhook via our proxy
    const response = await fetch(PROXY_API.camundaApproval, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Failed to send approval: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending task approval:', error);
    throw error;
  }
}

// Update task status and notify Camunda
export async function updateTaskStatus(taskId: string, status: 'approved' | 'completed' | 'rejected'): Promise<Task> {
  // Find the task in our local data
  const taskIndex = MOCK_API.tasks.findIndex(t => t._id === taskId || t.id === taskId);
  
  if (taskIndex === -1) {
    throw new Error(`Task with ID ${taskId} not found`);
  }
  
  // Update local data
  MOCK_API.tasks[taskIndex].status = status;
  const updatedTask = {...MOCK_API.tasks[taskIndex]};
  
  // If the task has a correlationId, send the update to Camunda
  const correlationId = updatedTask.correlationId;
  if (correlationId) {
    try {
      await sendTaskApproval(correlationId, status === 'approved', 
        status === 'approved' ? 'Approved' : 'Rejected');
    } catch (error) {
      console.error('Failed to notify Camunda of status change:', error);
      // Continue even if Camunda notification fails
    }
  }
  
  return updatedTask;
}

// Get all tasks
export const getAllTasksOriginal = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

// Get task by ID
export const getTaskByIdOriginal = async (id: string): Promise<Task | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    return null;
  }
};

// Create a new task
export const createTaskOriginal = async (taskData: Omit<Task, '_id' | 'id' | 'status' | 'dateSubmitted'>): Promise<Task | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...taskData,
        status: 'pending',
        dateSubmitted: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
};

// Update task status
export const updateTaskStatusOriginal = async (id: string, status: Task['status']): Promise<Task | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    return null;
  }
};
