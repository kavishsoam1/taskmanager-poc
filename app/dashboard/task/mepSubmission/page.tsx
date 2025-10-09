"use client";
import React, { useState } from "react";

export default function MEPDesignSubmissionPage() {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  const handleFileChange = (key: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Uploaded Files:", files);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          MEP Design Submission
        </h1>
        <hr className="my-4" />

        <h2 className="text-lg font-semibold text-green-700">
          Common drawings required for all units
        </h2>
        <h3 className="text-md font-medium mb-4">Attachments</h3>
        <hr className="my-3" />

        {[
          "Reflected Ceiling Plan",
          "Lighting Layout",
          "Power Layout",
          "Load Schedule/ Single Line Drawings",
          "Telephone/ Data Layout",
          "Fire Alarm Layout (Above and Below ceiling) and Schematic",
          "Emergency Light Layout",
          "HVAC Layout",
          "Refrigerant Piping Layout",
          "Heat Load Calculation",
          "Kitchen Extract Layout",
          "Fresh Air Layout",
          "General Ventilation Layout",
          "Condensate Drain Layout",
          "AC Equipment Data Sheet",
          "FAHU Data Sheet",
          "Ecology Unit Data Sheet",
          "Kitchen Hood Data Sheet and Layout",
          "Ventilation calculation/ Schematic",
          "Firefighting Layout",
          "Water Supply Layout",
          "Drainage Layout",
          "Grease Trap Data Sheet",
          "Natural Gas Layout",
          "Fire Suppression Layout",
          "Kitchen Equipment Layout",
          "Smoke Extract System",
          "Vendor List Compliance",
        ].map((label, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <p className="font-semibold text-gray-800 mb-2">
              {index + 1}. {label}
            </p>

            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) =>
                handleFileChange(`doc${index + 1}`, e.target.files?.[0] || null)
              }
              className="block w-full mb-3 text-sm text-gray-700"
            />

            {files[`doc${index + 1}`] && (
              <div className="mt-2 border rounded-lg p-3 bg-gray-100">
                <p className="text-sm font-medium mb-2">
                  Preview: {files[`doc${index + 1}`]?.name}
                </p>
                {files[`doc${index + 1}`]?.type.includes("pdf") ? (
                  <iframe
                    src={URL.createObjectURL(files[`doc${index + 1}`] as File)}
                    width="100%"
                    height="400px"
                    className="border rounded-md"
                  ></iframe>
                ) : (
                  <img
                    src={URL.createObjectURL(files[`doc${index + 1}`] as File)}
                    alt={label}
                    className="max-h-96 rounded-md"
                  />
                )}
              </div>
            )}
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-green-700">
            Conditions
          </h3>
          <p className="text-gray-700 mb-2">
            All changes are revised submission to be highlighted.
          </p>

          <div className="flex items-center space-x-2 mt-3">
            <input type="checkbox" defaultChecked disabled id="approved" />
            <label htmlFor="approved" className="text-gray-800">
              Approval
            </label>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
