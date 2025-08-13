'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
// Using correct relative path
import { createTask } from '../../../utils/api';

export default function NewTaskPage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    aadharNo: '',
    pdfFile: null as File | null,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is a PDF
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ 
          ...prev, 
          pdfFile: 'Only PDF files are allowed' 
        }));
        return;
      }
      
      setFormData(prev => ({ ...prev, pdfFile: file }));
      
      // Clear error when file is selected
      if (errors.pdfFile) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.pdfFile;
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) <= 0) {
      newErrors.age = 'Age must be a positive number';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.aadharNo) {
      newErrors.aadharNo = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Aadhar number must be 12 digits';
    }
    
    // PDF is now optional, so no validation required
    // if (!formData.pdfFile) {
    //   newErrors.pdfFile = 'Please upload a PDF document';
    // }
    
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    setErrors(newErrors);
    
    // If no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Create task using Camunda API
        const result = await createTask({
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          address: formData.address,
          aadharNo: formData.aadharNo,
          pdfFilePath: formData.pdfFile ? `/uploads/${formData.pdfFile.name}` : '',
        });
        
        console.log('Task created successfully:', result);
        
        // Show success message
        setSubmitSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          age: '',
          gender: '',
          address: '',
          aadharNo: '',
          pdfFile: null,
        });
      } catch (error) {
        console.error('Error creating task:', error);
        setSubmitError('Failed to create task. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">Task created successfully.</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setSubmitSuccess(false)}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      )}
      
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
            {/* <option value="prefer_not_to_say">Prefer not to say</option> */}
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
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload Document (PDF) <span className="text-red-500">*</span>
          </label>
          <input
            className={`shadow appearance-none border ${errors.file ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100`}
            id="file"
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="application/pdf"
          />
          {errors.pdfFile && <p className="text-red-500 text-xs italic mt-1">{errors.pdfFile}</p>}
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
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
