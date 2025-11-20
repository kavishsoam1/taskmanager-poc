"use client";
import React, { useEffect, useState } from "react";
import {getProcessVariables, getAllTasksOriginal } from '../../../utils/api';
const TenantDetailsView = () => {
     const [tenantData, setTenantData] = useState<Record<string, any> | null>(null);
console.log(tenantData)
  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const processInstanceKey = 	2251799814858551;
// const processInstanceKeyStr = processInstanceKey.toString();

        const res = await fetch('/api/proxy/zeebe-variables', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filter: { processInstanceKey },
            size: 1000,
          }),
        });

        const data = await res.json();
        console.log('Fetched Camunda/Zeebe Variables:', data);

        setTenantData(data);
      } catch (err) {
        console.error('Error fetching process variables:', err);
      }
    };

    fetchVariables();
  }, []);
  

  // Sample tenant data
  const tenant = {
    development: "Downtown Plaza",
    unit_No: "A-102",
    tenant_name: "ABC Trading LLC",
    operating_name: "ABC Retail",
    operation_bussiness: "Retail - Clothing",
    unit_type: "Retail",
    lease_team: 2,
    condition_permises: "Good",
    design_fit_out_period: 30,
    fit_ot_start_date: "2025-09-01",
    opening_date_asPer_LA: "2025-11-01",
    name: "John Doe",
    designation: "Manager",
    comapany: "ABC Group",
    address_po_box: "P.O. Box 12345",
    address_phy_add: "Business Bay, Dubai",
    tel_country_code: "+971",
    tel: "045678900",
    mb_country_code: "+971",
    mob: "0501234567",
    email: "john.doe@abc.com",
    special_requirements: "Need extended working hours approval.",
    filepicker_f1_attachment: "lease-agreement.pdf",
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
      <h2 className="text-3xl font-semibold text-green-700 text-center mb-6">
        Tenant Details
      </h2>

      {/* LOCATION DETAILS */}
      <Section title="Location and Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Detail label="Development" value={tenantData?.firstName} />
          <Detail label="Unit No." value={tenantData?.LastName} />
          <Detail label="Tenant" value={tenant.tenant_name} />
          <Detail label="Operating Name" value={tenant.operating_name} />
          <Detail label="Operation Business" value={tenant.operation_bussiness} />
          <Detail label="Unit Type" value={tenant.unit_type} />
          <Detail label="Lease Team" value={tenant.lease_team} />
          <Detail label="Condition of Premises" value={tenant.condition_permises} />
          <Detail
            label="Design & Fit Out Period"
            value={`${tenant.design_fit_out_period} days`}
          />
          <Detail label="Fit Out Start Date" value={tenant.fit_ot_start_date} />
          <Detail label="Opening Date as per LA" value={tenant.opening_date_asPer_LA} />
        </div>
      </Section>

      {/* CONTACT */}
      <Section title="Contact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Detail label="Name" value={tenant.name} />
          <Detail label="Designation" value={tenant.designation} />
          <Detail label="Company" value={tenant.comapany} />
          <Detail label="Address (PO Box)" value={tenant.address_po_box} />
          <Detail label="Physical Address" value={tenant.address_phy_add} />
          <Detail
            label="Telephone"
            value={`${tenant.tel_country_code} ${tenant.tel}`}
          />
          <Detail label="Mobile" value={`${tenant.mb_country_code} ${tenant.mob}`} />
          <Detail label="Email" value={tenant.email} />
        </div>
      </Section>

      {/* SPECIAL REQUIREMENTS */}
      <Section title="Special Requirements">
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 text-gray-700">
          {tenant.special_requirements}
        </div>
      </Section>

      {/* ATTACHMENT */}
      <Section title="Attachment">
        <a
          href={`/${tenant.filepicker_f1_attachment}`}
          target="_blank"
          rel="noreferrer"
          className="text-green-700 font-medium hover:underline flex items-center gap-1"
        >
          📎 {tenant.filepicker_f1_attachment}
        </a>
      </Section>
    </div>
  );
};

const Section = ({ title, children } : any) => (
  <section className="mb-8 border-t border-gray-200 pt-4">
    <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-1 border-gray-200">
      {title}
    </h3>
    {children}
  </section>
);

const Detail = ({ label, value }: any) => (
  <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-gray-800">{value || "-"}</p>
  </div>
);

export default TenantDetailsView;
