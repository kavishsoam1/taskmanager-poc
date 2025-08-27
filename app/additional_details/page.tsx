'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiMiddleware, PROXY_API } from '../utils/api';

export default function AdditionalDetailsPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  // Define interfaces for type safety
  interface FormData {
    name: string;
    age: string;
    gender: string;
    address: string;
    aadharNo: string;
    extraDetails1: string;
    extraDetails2: string;
    extraDetails3: string;
    extraDetails4: string;
  }

  interface ProcessVariable {
    name: string;
    value: string;
    [key: string]: any;
  }

  interface Errors {
    [key: string]: string;
  }

  // Form data state with type
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    address: '',
    aadharNo: '',
    extraDetails1: '',
    extraDetails2: '',
    extraDetails3: '',
    extraDetails4: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [processInstanceKey, setProcessInstanceKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        setSubmitError('Invalid token parameter');
        setIsLoading(false);
        return;
      }

      try {
        // Step 1: Fetch all process instances
        const processResponse = await fetch(PROXY_API.zeebeProcessInstances, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filter: {
              bpmnProcessId: "workflow_5" // Process ID for the workflow
            },
            size: 1000
          })
        });

        if (!processResponse.ok) {
          throw new Error(`Failed to fetch process instances: ${processResponse.status}`);
        }

        const processData = await processResponse.json();
        const instances = processData.items || [];
        
        console.log(`Found ${instances.length} process instances`);
        
        // Find the instance that matches our token and email
        let foundInstance = null;
        for (const instance of instances) {
          // Step 2: For each instance, get variables
          const variablesResponse = await fetch(PROXY_API.zeebeVariables, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              filter: {
                processInstanceKey: instance.key
              },
              size: 1000
            })
          });

          if (!variablesResponse.ok) {
            console.warn(`Failed to fetch variables for instance ${instance.key}: ${variablesResponse.status}`);
            continue;
          }

          const variablesData = await variablesResponse.json();
          const variables = variablesData.items || [];
          
          console.log(`Found ${variables.length} variables for instance ${instance.key}`);
          
          // Look for token match - direct match or in a JSON string
          let tokenFound = false;
          
          // Check all variables for token
          for (const variable of variables) {
            // Token is stored with quotes in the value field
            if (variable.name === 'token') {
              console.log('Found token variable:', variable.value);
              
              try {
                // Remove surrounding quotes from the token value
                const tokenValue = JSON.parse(variable.value);
                if (tokenValue === token) {
                  tokenFound = true;
                  console.log('Token matched successfully');
                  break;
                }
              } catch (e) {
                console.error('Error parsing token value:', e);
                
                // Fallback: try direct comparison if parsing fails
                if (variable.value === `"${token}"`) {
                  tokenFound = true;
                  console.log('Token matched with direct string comparison');
                  break;
                }
              }
            }
            
            // Look for token in other JSON objects
            try {
              const value = variable.value;
              if (value && (value.startsWith('{') || value.startsWith('['))) {
                const parsed = JSON.parse(value);
                if (parsed && typeof parsed === 'object') {
                  if (parsed.token === token) {
                    tokenFound = true;
                    console.log('Token found in nested object:', variable.name);
                    break;
                  }
                }
              }
            } catch (e) {
              // Not valid JSON, continue with next variable
            }
          }
          
          // If we find token match, use this instance
          if (tokenFound) {
            console.log(`Found matching instance: ${instance.key}`);
            foundInstance = instance;
            setProcessInstanceKey(instance.key.toString());
            
            // Look for application data in variables
            // First check for a 'variables' container
            const variablesItem = variables.find((v: { name: string; value: string }) => v.name === 'variables');
            if (variablesItem) {
              try {
                const parsedVariables = JSON.parse(variablesItem.value);
                
                // Fill the form with data from variables
                setFormData({
                  name: parsedVariables.name || '',
                  age: parsedVariables.age ? parsedVariables.age.toString() : '',
                  gender: parsedVariables.gender || '',
                  address: parsedVariables.address || '',
                  aadharNo: parsedVariables.aadhar || parsedVariables.aadhaar || '',
                  extraDetails1: parsedVariables.extraDetails1 || '',
                  extraDetails2: parsedVariables.extraDetails2 || '',
                  extraDetails3: parsedVariables.extraDetails3 || '',
                  extraDetails4: parsedVariables.extraDetails4 || '',
                });
              } catch (error) {
                console.error('Error parsing variables:', error);
              }
            } else {
              // If no 'variables' container found, try to construct from individual variables
              const appData: Record<string, any> = {};
              
              // Map of variable names to check and their potential aliases in the API
              const variablesToCheck = [
                {key: 'name', aliases: ['name', 'userName']},
                {key: 'age', aliases: ['age']},
                {key: 'gender', aliases: ['gender']},
                {key: 'address', aliases: ['address']},
                {key: 'aadharNo', aliases: ['aadhaar', 'aadhar']},
                {key: 'extraDetails1', aliases: ['extraDetails1', 'textfield_s2njz']},
                {key: 'extraDetails2', aliases: ['extraDetails2', 'textfield_7j7qyi']},
                {key: 'extraDetails3', aliases: ['extraDetails3', 'textfield_2b6e56']},
                {key: 'extraDetails4', aliases: ['extraDetails4', 'textfield_dkwfk8']}
              ];
              
              // Look for individual variables with proper parsing
              for (const {key, aliases} of variablesToCheck) {
                // Find first matching variable from aliases
                let foundVariable = null;
                for (const alias of aliases) {
                  foundVariable = variables.find((v: { name: string; value: string }) => v.name === alias);
                  if (foundVariable) break;
                }
                
                if (foundVariable) {
                  try {
                    // API values come with surrounding quotes that need to be parsed
                    const parsedValue = JSON.parse(foundVariable.value);
                    console.log(`Parsed ${key} from ${foundVariable.name}:`, parsedValue);
                    appData[key] = parsedValue;
                  } catch (e) {
                    console.warn(`Error parsing ${key} from ${foundVariable.name}:`, e);
                    // If parsing fails, strip quotes and use as string
                    const value = foundVariable.value.replace(/^"|"$/g, '');
                    appData[key] = value;
                  }
                }
              }
              
              if (Object.keys(appData).length > 0) {
                console.log('Constructed application data from individual variables:', appData);
                // Use the constructed data
                setFormData({
                  name: appData.name || '',
                  age: appData.age ? appData.age.toString() : '',
                  gender: appData.gender || '',
                  address: appData.address || '',
                  aadharNo: appData.aadhaar || appData.aadhar || '',
                  extraDetails1: appData.extraDetails1 || '',
                  extraDetails2: appData.extraDetails2 || '',
                  extraDetails3: appData.extraDetails3 || '',
                  extraDetails4: appData.extraDetails4 || '',
                });
              }
            }
            break;
          }
        }

        if (!foundInstance) {
          setSubmitError('No matching application found for this token');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setSubmitError('Failed to load application data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // No mandatory check for extra details fields - all are optional
    
    // Only validate age if it's provided
    if (formData.age && parseInt(formData.age) <= 0) {
      newErrors.age = 'Age must be a positive number';
    }
    
    // Only validate aadhar number if it's provided
    if (formData.aadharNo && !/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Aadhar number must be 12 digits';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    setErrors(newErrors);
    
    // If no errors and we have a token, proceed with form submission
    if (Object.keys(newErrors).length === 0 && token) {
      setIsSubmitting(true);
      try {
        // Prepare the request payload according to the required format
        const requestPayload: Record<string, any> = {
          token: token
        };
        
        // Add extra_details_1 only if it has a value
        if (formData.extraDetails1) requestPayload.extra_details_1 = formData.extraDetails1;
        
        // Add other details if they are provided
        if (formData.extraDetails2) requestPayload.extra_details_2 = formData.extraDetails2;
        if (formData.extraDetails3) requestPayload.extra_details_3 = formData.extraDetails3;
        if (formData.extraDetails4) requestPayload.extra_details_4 = formData.extraDetails4;
        
        // Include other fields if they have values
        if (formData.name) requestPayload.name = formData.name;
        if (formData.age) requestPayload.age = parseInt(formData.age, 10);
        if (formData.gender) requestPayload.gender = formData.gender;
        if (formData.address) requestPayload.address = formData.address;
        if (formData.aadharNo) requestPayload.aadhar = formData.aadharNo;
        
        console.log('Submitting additional details:', requestPayload);
        
        // Submit data using the additional-details endpoint
        const response = await fetch(PROXY_API.additionalDetails, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload)
        });
        
        if (!response.ok) {
          throw new Error(`Failed to submit additional details: ${response.status}`);
        }
        
        const responseData = await response.json();
        console.log('Additional details submitted successfully:', responseData);
        
        // Show success message
        setSubmitSuccess(true);
      } catch (error) {
        console.error('Error submitting additional details:', error);
        setSubmitError('Failed to submit additional details. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Complete Additional Details</h1>
      
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{submitError}</span>
        </div>
      )}
      
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">Your additional details have been submitted successfully.</span>
        </div>
      )}
      
      {!isLoading && !submitError && !submitSuccess && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500`}
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              className={`shadow appearance-none border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500`}
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              min="1"
            />
            {errors.age && <p className="text-red-500 text-xs italic mt-1">{errors.age}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              className={`shadow appearance-none border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500`}
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs italic mt-1">{errors.gender}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`shadow appearance-none border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500`}
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows={4}
            />
            {errors.address && <p className="text-red-500 text-xs italic mt-1">{errors.address}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadharNo">
              Aadhar Number <span className="text-red-500">*</span>
            </label>
            <input
              className={`shadow appearance-none border ${errors.aadharNo ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500`}
              id="aadharNo"
              type="text"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              placeholder="12-digit Aadhar number"
              maxLength={12}
              pattern="[0-9]{12}"
            />
            {errors.aadharNo && <p className="text-red-500 text-xs italic mt-1">{errors.aadharNo}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="extraDetails1">
              Extra Details 1
            </label>
            <textarea
              className={`shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500`}
              id="extraDetails1"
              name="extraDetails1"
              value={formData.extraDetails1}
              onChange={handleChange}
              placeholder="Enter extra details 1"
              rows={2}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="extraDetails2">
              Extra Details 2
            </label>
            <textarea
              className={`shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500`}
              id="extraDetails2"
              name="extraDetails2"
              value={formData.extraDetails2}
              onChange={handleChange}
              placeholder="Enter extra details 2"
              rows={2}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="extraDetails3">
              Extra Details 3
            </label>
            <textarea
              className={`shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500`}
              id="extraDetails3"
              name="extraDetails3"
              value={formData.extraDetails3}
              onChange={handleChange}
              placeholder="Enter extra details 3"
              rows={2}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="extraDetails4">
              Extra Details 4
            </label>
            <textarea
              className={`shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500`}
              id="extraDetails4"
              name="extraDetails4"
              value={formData.extraDetails4}
              onChange={handleChange}
              placeholder="Enter extra details 4"
              rows={2}
            />
          </div>
          
          <div className="flex items-center justify-end">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting ? 'Submitting...' : 'Submit Additional Details'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
