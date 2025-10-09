"use client"; // Next.js App Router

import React, { useState } from "react";

const InspectionRequestForm = () => {
  // Readonly Tenant info (could come from props/API)
  const [tenantInfo] = useState({
    tenant_name: "John Doe",
    unit_No: "A101",
    name: "Premium Unit",
    unit_type: "Retail",
    company: "ABC Corp",
    tel: "+97112345678",
    mob: "+97198765432",
    email: "tenant@example.com",
  });

  // Checkboxes state
  const [checkboxes, setCheckboxes] = useState({
    f13_checkbox_water_proofing: false,
    f13_checkbox_gravity_pipe: false,
    f13_checkbox_kitchen_install_inspection: false,
    f13_checkbox_pre_ceiling_inspection: false,
    f13_checkbox_sprinkler: false,
    f13_checkbox_fire_alarm_test: false,
    f13_checkbox_chilled_water: false,
    f13_checkbox_water_pipe_inspection: false,
    f13_checkbox_db_test_inspection: false,
    f13_checkbox_flooring_inspection: false,
    f13_checkbox_grease_installaion: false,
    f13_checkbox_fcu_ahu_fan_install: false,
    s13_checkbox_roof_inspection: false,
    f13_checkbox_final_pre_opeing_inspection: false,
    f13_checkbox_others: false,
  });

  // Dates state
  const [dates, setDates] = useState({
    f13_date_dlco1: "",
    f13_date_gravity_piping: "",
    f13_date_litchen_tiles_inspection: "",
    f3_date_pre_celling_close_inspection: "",
    f3_date_sprinkler_pipe_inspection: "",
    f13_date_fire_alarm_test: "",
    f13_date_chilled_water_ref_inspection: "",
    f13_date_water_pipe_inspection: "",
    f13_date_db_magger_tets: "",
    f13_date_flooring_inspection: "",
    f13_date_grease_trap_installation: "",
    f13_date_fcu_ahu_fan_install: "",
    f13_date_roof_inspection: "",
    f13_date_final_pre_opening_inspection: "",
    f13_date_others: "",
  });

  const handleCheckboxChange = (key: string) => {
    setCheckboxes({ ...checkboxes, [key]: !checkboxes[key] });
  };

  const handleDateChange = (key: string, value: string) => {
    setDates({ ...dates, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { tenantInfo, checkboxes, dates };
    console.log("Form Data:", formData);
    alert("Form submitted! Check console for details.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h3 className="text-xl font-bold mb-4">Tenant & Unit Info</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-medium">Tenant</label>
          <input
            type="text"
            value={tenantInfo.tenant_name}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="font-medium">Unit No.</label>
          <input
            type="text"
            value={tenantInfo.unit_No}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="font-medium">Unit Name</label>
          <input
            type="text"
            value={tenantInfo.name}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="font-medium">Unit Type</label>
          <input
            type="text"
            value={tenantInfo.unit_type}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="font-medium">Company Name</label>
          <input
            type="text"
            value={tenantInfo.company}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="font-medium">Telephone</label>
          <input
            type="text"
            value={tenantInfo.tel}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="font-medium">Mobile</label>
          <input
            type="text"
            value={tenantInfo.mob}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="font-medium">Email</label>
          <input
            type="text"
            value={tenantInfo.email}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <hr className="mb-4" />
      <h3 className="text-xl font-bold mb-4">Create Inspection Request</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Loop over all checkboxes and date fields */}
        {Object.keys(checkboxes).map((key) => (
          <div key={key} className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={checkboxes[key as keyof typeof checkboxes]}
              onChange={() => handleCheckboxChange(key)}
            />
            <label className="flex-1">{key.replace(/_/g, " ")}</label>
            <input
              type="date"
              value={dates[key as keyof typeof dates] || ""}
              onChange={(e) => handleDateChange(key, e.target.value)}
              className="border border-gray-300 rounded-md p-1"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InspectionRequestForm;
