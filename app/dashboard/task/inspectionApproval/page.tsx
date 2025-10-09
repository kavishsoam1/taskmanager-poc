// App.jsx
import React from "react";

const InspectionApproval = () => {
  // Sample data (replace with your actual data)
  const data = {
    tenant_name: "John Doe",
    unit_No: "A-101",
    name: "Unit Alpha",
    unit_type: "Retail",
    comapany: "ACME Corp",
    tel: "+91-1234567890",
    mob: "+91-9876543210",
    email: "john.doe@example.com",
    f13_date_dlco1: "2025-10-09",
    f13_date_gravity_piping: "2025-10-08",
    f13_date_litchen_tiles_inspection: "2025-10-07",
    f3_date_pre_celling_close_inspection: "2025-10-06",
    f3_date_sprinkler_pipe_inspection: "2025-10-05",
    f13_date_fire_alarm_test: "2025-10-04",
    f13_date_chilled_water_ref_inspection: "2025-10-03",
    f13_date_water_pipe_inspection: "2025-10-02",
    f13_date_db_magger_tets: "2025-10-01",
    f13_date_flooring_inspection: "2025-09-30",
    f13_date_grease_trap_installation: "2025-09-29",
    f13_date_fcu_ahu_fan_install: "2025-09-28",
    f13_date_roof_inspection: "2025-09-27",
    f13_date_final_pre_opening_inspection: "2025-09-26",
    f13_date_others: "2025-09-25",
    pre_opening: true
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Inspection Form Approval</h2>

      <hr className="border-gray-300" />

      {/* Tenant Info */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="font-semibold">Tenant Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="font-semibold">Tenant</p>
            <p>{data.tenant_name}</p>
          </div>
          <div>
            <p className="font-semibold">Unit No.</p>
            <p>{data.unit_No}</p>
          </div>
          <div>
            <p className="font-semibold">Unit Name</p>
            <p>{data.name}</p>
          </div>
          <div>
            <p className="font-semibold">Unit Type</p>
            <p>{data.unit_type}</p>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="font-semibold">Company Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="font-semibold">Company Name</p>
            <p>{data.comapany}</p>
          </div>
          <div>
            <p className="font-semibold">Telephone</p>
            <p>{data.tel}</p>
          </div>
          <div>
            <p className="font-semibold">Mobile</p>
            <p>{data.mob}</p>
          </div>
          <div>
            <p className="font-semibold">Email</p>
            <p>{data.email}</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Inspection Requests */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h3 className="font-semibold">Create Inspection Request</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Water Proofing Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_dlco1}</p>
          </div>

          <div>
            <p className="font-semibold">Gravity Pipe Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_gravity_piping}</p>
          </div>

          <div>
            <p className="font-semibold">Kitchen Tiles & Grout Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_litchen_tiles_inspection}</p>
          </div>

          <div>
            <p className="font-semibold">Pre-Ceiling Closure Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f3_date_pre_celling_close_inspection}</p>
          </div>

          <div>
            <p className="font-semibold">Sprinkler Pipe Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f3_date_sprinkler_pipe_inspection}</p>
          </div>

          <div>
            <p className="font-semibold">Fire Alarm Test</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_fire_alarm_test}</p>
          </div>

          <div>
            <p className="font-semibold">Chilled Water / Refrigerant Pipe Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_chilled_water_ref_inspection}</p>
          </div>

          <div>
            <p className="font-semibold">Water Pipe Pressure Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_water_pipe_inspection}</p>
          </div>

          <div>
            <p className="font-semibold">DB / Megger Test</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_db_magger_tets}</p>
          </div>

          <div>
            <p className="font-semibold">General Flooring Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_flooring_inspection}</p>
          </div>

          <div>
            <p className="font-semibold">Grease Trap Installation</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_grease_trap_installation}</p>
          </div>

          <div>
            <p className="font-semibold">FCU / AHU / Extract Fan Installation</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_fcu_ahu_fan_install}</p>
          </div>

          <div>
            <p className="font-semibold">Roof Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_roof_inspection}</p>
          </div>

          <div>
            <p className="font-semibold">Final Pre-Opening Inspection</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_final_pre_opening_inspection}</p>
          </div>

          <div>
            <p className="font-semibold">Others</p>
            <p>Completed: Yes</p>
            <p>Date: {data.f13_date_others}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-semibold">Pre-Opening Checkbox:</p>
          <p>{data.pre_opening ? "Checked" : "Unchecked"}</p>
        </div>
      </div>
    </div>
  );
};

export default InspectionApproval;
