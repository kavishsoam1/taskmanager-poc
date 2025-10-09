// App.jsx
import React from "react";

const App = () => {
  // Sample data
  const data = {
    tenant_name: "John Doe",
    unit_No: "A-101",
    name: "Unit Alpha",
    unit_type: "Retail",
    comapany: "ACME Corp",
    tel: "+91-1234567890",
    mob: "+91-9876543210",
    email: "john.doe@example.com",
    f20_total_late_opening_penalites: 5000,
    f20_other_amount_due: 1500,
    f20_settlement_status: "Pending"
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Permission to Trade Statement</h2>

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
            <p className="font-semibold">Company</p>
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

      {/* File Summary */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">File Summary (as per lease agreement)</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Total Late Opening Penalties</p>
            <p>{data.f20_total_late_opening_penalites}</p>
          </div>
          <div>
            <p className="font-semibold">Other Amount Due (TVR, etc.)</p>
            <p>{data.f20_other_amount_due}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-semibold">Settlement Status</p>
            <p>{data.f20_settlement_status}</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />
    </div>
  );
};

export default App;
