"use client"; // Next.js App Router: enable hooks

import React, { useState } from "react";

const NoObjectionForm = () => {
  // State for text field
  const [mainContractorName, setMainContractorName] = useState("");

  // State for approval checkbox
  const [isApproved, setIsApproved] = useState(false);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      mainContractorName,
      isApproved,
    };

    console.log("Form Data:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h3 className="text-xl font-bold mb-4">
        Al Bahar Al Mutawasti Rest LLC SP
      </h3>
      <hr className="mb-4" />

      <h3 className="text-lg font-semibold mb-2">No Objection Submission</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Contractor Name */}
        <div>
          <label className="block font-medium mb-1">Main Contractor Name</label>
          <input
            type="text"
            value={mainContractorName}
            onChange={(e) => setMainContractorName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter Main Contractor Name"
          />
        </div>

        {/* No Objection Text */}
        <div className="space-y-2">
          <h4 className="font-semibold">No Objection for Site Mobilization</h4>
          <p>To: Aljada Mall Project Manager</p>
          <p>Subject: No Objection for Site Mobilization</p>
          <p>Dear Sir,</p>
          <p>
            The respective Tenant has appointed Al Bahar Al Mutawasti Rest LLC as
            their main contractor to undertake the fit-out decoration within the
            above-mentioned unit. Retail Design and Delivery has completed their
            due diligence, and has no objection permitting same. Prior to
            mobilization, the Tenant’s main contractor and their sub-contractor(s)
            must complete a compulsory Health & Safety Site Induction undertaken
            by Aljada Mall main contractor, and must comply with Aljada Mall
            Health and Safety Policies and Procedures.
          </p>
          <p>Yours sincerely,</p>
          <p>Arada RDD</p>
        </div>

        {/* Approval Checkbox */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isApproved}
              onChange={(e) => setIsApproved(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Approve</span>
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoObjectionForm;
