"use client";
import React, { useState } from "react";

const initialForm = {
  tenant_name: "",
  unit_No: "",
  name: "",
  unit_type: "",
  comapany: "",
  tel: "",
  mob: "",
  email: "",
  f20_total_late_opening_penalites: "",
  f20_other_amount_due: "",
  f20_settlement_status: "",
};

function PermissionToTradeForm() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Form submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Permission To Trade Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tenant Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Tenant</h3>
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="tenant_name"
            value={form.tenant_name}
            onChange={handleChange}
            placeholder="Tenant"
          />
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="unit_No"
            value={form.unit_No}
            onChange={handleChange}
            placeholder="Unit no."
          />
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Unit Name"
          />
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="unit_type"
            value={form.unit_type}
            onChange={handleChange}
            placeholder="Unit type"
          />
        </div>

        {/* Company Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Company</h3>
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="comapany"
            value={form.comapany}
            onChange={handleChange}
            placeholder="Company"
          />
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="tel"
            value={form.tel}
            onChange={handleChange}
            placeholder="Telephone"
          />
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="mob"
            value={form.mob}
            onChange={handleChange}
            placeholder="Mobile"
          />
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        {/* File Summary */}
        <div>
          <h3 className="font-semibold text-lg border-b pb-2">
            File summary (as per lease agreement)
          </h3>
        </div>

        {/* Penalties & Amounts */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Penalties</h3>
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="f20_total_late_opening_penalites"
            value={form.f20_total_late_opening_penalites}
            onChange={handleChange}
            placeholder="Total late opening penalties"
          />
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="f20_other_amount_due"
            value={form.f20_other_amount_due}
            onChange={handleChange}
            placeholder="Other amount due (TVR, etc)"
          />
        </div>

        {/* Settlement Status */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg border-b pb-2">Settlement Status</h3>
          <input
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="f20_settlement_status"
            value={form.f20_settlement_status}
            onChange={handleChange}
            placeholder="Settlement status"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PermissionToTradeForm;
