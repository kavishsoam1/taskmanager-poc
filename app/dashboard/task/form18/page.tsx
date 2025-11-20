// File: ServiceConnectionForm.js
import React from "react";

// Sample data (replace with actual API data if needed)
const formData = {
  tenant: "All bahar al mutawaist rest all sp",
  unitNo: "unit 201-B",
  unitName: "unit name goes here",
  unitType: "Retail",
  companyName: "company name goes here",
  telephone: "+971 2223334443",
  mobile: "+971 2223334443",
  email: "sample@sample.com",
  items: [
    {
      label: "Firefighting connection and sprinkler value",
      activation: "value2",
      attachment: "firefighting_doc.pdf",
    },
    {
      label: "Fire Alarm Interface",
      activation: "value3",
      attachment: "fire_alarm_doc.pdf",
    },
    {
      label: "Chilled Water Connection / Chilled water Value",
      activation: "value",
      attachment: "chilled_water_doc.pdf",
    },
    {
      label: "Permanent Power Activation",
      activation: "value2",
      attachment: "power_activation_doc.pdf",
    },
    {
      label: "Cold Water Supply Value",
      activation: "value3",
      attachment: "cold_water_doc.pdf",
    },
    {
      label: "Natural Gas(NG) Value",
      activation: "value",
      attachment: "natural_gas_doc.pdf",
    },
  ],
};

const ServiceConnectionForm = () => {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Service Connection Request Form
      </h3>
      <hr style={{ marginBottom: "20px" }} />

      {/* Tenant & Unit Info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "15px", marginBottom: "20px" }}>
        <div><strong>Tenant:</strong> {formData.tenant}</div>
        <div><strong>Unit No.:</strong> {formData.unitNo}</div>
        <div><strong>Unit Name:</strong> {formData.unitName}</div>
        <div><strong>Unit Type:</strong> {formData.unitType}</div>
      </div>

      {/* Company Info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "15px", marginBottom: "20px" }}>
        <div><strong>Company Name:</strong> {formData.companyName}</div>
        <div><strong>Telephone:</strong> {formData.telephone}</div>
        <div><strong>Mobile:</strong> {formData.mobile}</div>
        <div><strong>Email:</strong> {formData.email}</div>
      </div>

      <hr style={{ marginBottom: "20px" }} />

      {/* Items Table */}
      <h4>Service connection items</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 2fr",
          gap: "10px",
          fontWeight: "bold",
          marginTop: "10px",
          marginBottom: "5px",
        }}
      >
        <div>Item</div>
        <div>Activation</div>
        <div>Attachment</div>
      </div>

      {formData.items.map((item, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr",
            gap: "10px",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            marginBottom: "10px",
          }}
        >
          <div>{item.label}</div>
          <div style={{ textAlign: "center" }}>{item.activation}</div>
          <div style={{ textAlign: "center", fontStyle: "italic" }}>{item.attachment}</div>
        </div>
      ))}

      <hr style={{ marginTop: "20px" }} />
    </div>
  );
};

export default ServiceConnectionForm;
