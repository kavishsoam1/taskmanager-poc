// API base URL - replace with actual URL when deployed
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Task type definition
export interface Task {
  _id?: string;
  id?: string;
  name: string;
  age: string;
  gender: string;
  address: string;
  aadharNo: string;
  pdfFilePath?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  dateSubmitted?: string;
}

// Camunda API config
const CAMUNDA_API = {
  baseUrl: 'http://localhost:8085',
  inboundEndpoint: '/inbound/fcsrt1265',
  auth: {
    username: 'demo',
    password: 'demo'
  }
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

    // Call Camunda API
    const response = await apiMiddleware.post<any>(
      `${CAMUNDA_API.baseUrl}${CAMUNDA_API.inboundEndpoint}`,
      camundaData
    );

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

// Get all tasks (using mock data for now)
export async function getAllTasks(): Promise<Task[]> {
  // Return mock data
  return Promise.resolve([...MOCK_API.tasks]);
}

// Get task by ID (using mock data for now)
export async function getTaskById(taskId: string): Promise<Task> {
  const task = MOCK_API.tasks.find(t => t._id === taskId || t.id === taskId);
  
  if (!task) {
    throw new Error(`Task with ID ${taskId} not found`);
  }
  
  return Promise.resolve({...task});
}

// Update task status (using mock data for now)
export async function updateTaskStatus(taskId: string, status: 'approved' | 'completed' | 'rejected'): Promise<Task> {
  // Update mock data
  const taskIndex = MOCK_API.tasks.findIndex(t => t._id === taskId || t.id === taskId);
  
  if (taskIndex === -1) {
    throw new Error(`Task with ID ${taskId} not found`);
  }
  
  MOCK_API.tasks[taskIndex].status = status;
  return Promise.resolve({...MOCK_API.tasks[taskIndex]});
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
