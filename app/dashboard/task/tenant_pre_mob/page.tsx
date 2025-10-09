"use client";
import React, { useState } from "react";

export default function PreMobilizationRequirements() {
  const [formData, setFormData] = useState<any>({});
  const [files, setFiles] = useState<any>({});

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (key: string, file: File | null) => {
    setFiles((prev: any) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Files:", files);
  };

  const preMobItems = [
    { label: "Design Approval*", key: "pre_mobDoc1" },
    {
      label:
        "Contractor’s All Risks Insurance with TPL and Workmen’s Compensation Certificate Copy*",
      key: "pre_mobDoc2",
    },
    {
      label:
        "Fit-out Work Method Statement and Risks Assessment – MSRA (full scope)*",
      key: "pre_mobDoc3",
    },
    { label: "HSE Safety Induction Certificate", key: "pre_mobDoc4" },
    { label: "Contractor’s HSE Plan*", key: "pre_mobDoc5" },
    {
      label: "HSE Certified Personnel’s Valid ID or Certificate",
      key: "pre_mobDoc6",
    },
    { label: "Program of Works*", key: "pre_mobDoc7" },
    {
      label:
        "Temporary power and water for fit-out use (to advise applicable fees, if any)",
      key: "pre_mobDoc8",
    },
    {
      label:
        "Landlord’s Work Permit Application (Fit-out Work Permit and Hot-work)*",
      key: "pre_mobDoc9",
    },
    {
      label:
        "Municipality/Civil Defence Approved Drawings (Submission Reference No./Proof of Application)",
      key: "pre_mobDoc10",
    },
    { label: "Others", key: "pre_mobDoc11" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
          Pre-Mobilization Requirements List
        </h1>

        {/* Tenant Details */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Tenant Details
        </h2>
        <hr className="mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tenant</label>
            <input
              readOnly
              value="Al Bahar Al Mutawasit Rest LLC SP"
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Unit No.</label>
            <input
              readOnly
              value="Unit 201-B"
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Unit Name
            </label>
            <input
              readOnly
              value="Unit name goes here"
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Unit Type
            </label>
            <input
              readOnly
              value="Retail"
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Company Name
            </label>
            <input
              readOnly
              value="Company name goes here"
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Telephone</label>
            <input
              readOnly
              value="+971 2343234345"
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Mobile</label>
            <input
              readOnly
              value="+971 2343234345"
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              readOnly
              value="sample@sample.com"
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>

        {/* Checklist Section */}
        <hr className="my-6" />
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Checklist Items
        </h2>

        {preMobItems.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-5 mb-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
          >
            {/* Item label */}
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-gray-700">
                {item.label}
              </label>
            </div>

            {/* File upload */}
            <div className="md:col-span-4">
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) =>
                  handleFileChange(item.key, e.target.files?.[0] || null)
                }
                className="block w-full text-sm text-gray-700"
              />
              {files[item.key] && (
                <div className="mt-2 bg-gray-50 p-2 rounded-md border">
                  <p className="text-sm mb-1">
                    Preview: {files[item.key]?.name}
                  </p>
                  {files[item.key]?.type.includes("pdf") ? (
                    <iframe
                      src={URL.createObjectURL(files[item.key])}
                      width="100%"
                      height="200"
                      className="border rounded-md"
                    ></iframe>
                  ) : (
                    <img
                      src={URL.createObjectURL(files[item.key])}
                      alt="Preview"
                      className="max-h-48 rounded-md"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Yes/No checkboxes */}
            <div className="md:col-span-3 flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData[`${item.key}_yes`] || false}
                  onChange={(e) =>
                    handleChange(`${item.key}_yes`, e.target.checked)
                  }
                />
                Yes
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData[`${item.key}_no`] || false}
                  onChange={(e) =>
                    handleChange(`${item.key}_no`, e.target.checked)
                  }
                />
                No
              </label>
            </div>
          </div>
        ))}

        {/* Comments */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comments
          </label>
          <textarea
            value={formData.f8_comments || ""}
            onChange={(e) => handleChange("f8_comments", e.target.value)}
            placeholder="Comments..."
            className="w-full border rounded-md p-3 h-28"
          />
        </div>

        {/* Submit */}
        <div className="text-center mt-10">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md text-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
