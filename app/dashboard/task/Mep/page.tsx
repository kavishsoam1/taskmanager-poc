"use client";

import React, { useState } from "react";

const TenantDetailsApproval: React.FC = () => {
  // Mock data: Replace these paths with your real file URLs
  const data = {
    f7_sampleDoc1: "/path/to/sample-approval.pdf", // can be .jpg, .png, .pdf
  };

  const [comments, setComments] = useState("Comments....");
  const [isApproved, setIsApproved] = useState(true);

  // Simple reusable render for document preview
  const renderDocument = (label: string, filePath: string) => {
    if (!filePath)
      return <p style={{ color: "red" }}>No document attached</p>;

    const fileType = filePath.split(".").pop()?.toLowerCase();

    return (
      <div style={{ marginBottom: "20px" }}>
        <h4>{label}</h4>
        {fileType === "pdf" ? (
          <iframe
            src={filePath}
            width="100%"
            height="400px"
            title={label}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginTop: "8px",
            }}
          />
        ) : (
          <img
            src={filePath}
            alt={label}
            style={{
              maxWidth: "100%",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginTop: "8px",
            }}
          />
        )}
      </div>
    );
  };

  // Handle button click actions
  const handleSubmit = (action: string) => {
    alert(`Action triggered: ${action}`);
  };

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fafafa",
      }}
    >
      <h2 className="text-4xl">Tenants Details Approval</h2>
      <hr />
      <h3>Al Bahar al Mutawaist Rest LLC</h3>
      <hr />

      {/* Action Buttons */}
      {/* <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => handleSubmit("Critical")}>Critical</button>
        <button onClick={() => handleSubmit("Tanents Appts")}>
          Tanents Appts
        </button>
        <button onClick={() => handleSubmit("Conceptal Design")}>
          Conceptal Design
        </button>
        <button onClick={() => handleSubmit("Arch Design")}>Arch Design</button>
        <button onClick={() => handleSubmit("MEP Design")}>MEP Design</button>
        <button onClick={() => handleSubmit("Sample Approval")}>
          Sample Approval
        </button>
      </div> */}

      <hr />
      <h3 className="text-2xl">Sample Approval</h3>
      <h4>Attach</h4>

      {/* Document preview */}
      {renderDocument("Sample Document", data.f7_sampleDoc1)}

      <hr />
      <h4>Comments</h4>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        style={{
          width: "100%",
          minHeight: "100px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <hr />

      {/* Action buttons for Approve / Return */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => handleSubmit("Return")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Return
        </button>
        <button
          onClick={() => handleSubmit("Approve")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Approve
        </button>
      </div>

      {/* Checkbox */}
      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={isApproved}
            onChange={(e) => setIsApproved(e.target.checked)}
          />{" "}
          Approval
        </label>
      </div>
    </div>
  );
};

export default TenantDetailsApproval;
