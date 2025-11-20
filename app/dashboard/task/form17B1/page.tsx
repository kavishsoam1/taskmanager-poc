// File: CloseOutDocForm.js
import React from "react";

const CloseOutDocForm = () => {
  // Sample data (replace with actual API data)
  const data = {
    items: [
      {
        label: "Design Based Snag list",
        attachment: "design_snag.pdf",
        comments: "Comments are goes here...",
        currentComments: "Resolved",
      },
      {
        label: "SM Grease Trap/Drainage NOC",
        attachment: "sm_noc.pdf",
        comments: "Comments are goes here...",
        currentComments: "Approved",
      },
      {
        label: "Food/Health Inspection Approval Report",
        attachment: "food_health.pdf",
        comments: "Comments are goes here...",
        currentComments: "Approved",
      },
      {
        label: "Tenancy Contract",
        attachment: "tenancy_contract.pdf",
        comments: "Comments are goes here...",
        currentComments: "Uploaded",
      },
      // Add remaining items similarly...
    ],
    generalComments: "All documents verified",
    attachments: "general_attachment.pdf",
    approval: true,
  };

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
        Al Bahar al mutawasit rtest llc
      </h3>
      <hr style={{ marginBottom: "20px" }} />

      <h4>Close-out documents checklist for F&B units</h4>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr 3fr", gap: "10px", fontWeight: "bold", marginTop: "15px", marginBottom: "5px" }}>
        <div>Items</div>
        <div>Yes</div>
        <div>Attachments</div>
        <div>Current comments</div>
      </div>

      {data.items.map((item, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr 3fr",
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
          <div style={{ textAlign: "center" }}>Yes</div>
          <div style={{ textAlign: "center", fontStyle: "italic" }}>{item.attachment}</div>
          <div>{item.currentComments}</div>
        </div>
      ))}

      <hr style={{ margin: "20px 0" }} />
      <h4>General Comments</h4>
      <p
        style={{
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        {data.generalComments}
      </p>

      <div style={{ marginTop: "15px" }}>
        <h4>Attach</h4>
        <p style={{ fontStyle: "italic" }}>{data.attachments}</p>
      </div>

      <div style={{ marginTop: "15px" }}>
        <h4>Approval</h4>
        <input type="checkbox" checked={data.approval} readOnly /> Approved
      </div>
    </div>
  );
};

export default CloseOutDocForm;
