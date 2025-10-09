"use client";
import React, { useState } from "react";

// Button component
const ActionButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 20px",
      marginRight: "10px",
      marginBottom: "10px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    {label}
  </button>
);

// File upload component
const FilePicker = ({ label, file, setFile }: { label: string; file: File | null; setFile: (f: File | null) => void }) => (
  <div style={{ marginBottom: "10px" }}>
    <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>
    <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
    {file && <p>Uploaded: {file.name}</p>}
  </div>
);

const SampleApprovalForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [comments, setComments] = useState("Comments....");

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <h2 style={{ color: "#333", fontSize:"24px" }}>Tenants details</h2>
      <hr style={{ marginBottom: "20px" }} />

      <h3 style={{ color: "#555",fontSize:"24px" }}>Al Bahar al mutawaist rest llc</h3>
      <hr style={{ marginBottom: "20px" }} />

      {/* Action Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <ActionButton label="Critical" />
        <ActionButton label="Tenants Appts" />
        <ActionButton label="Conceptual Design" />
        <ActionButton label="Arch Design" />
        <ActionButton label="MEP Design" />
        <ActionButton label="Sample Approval" />
      </div>
      <hr style={{ marginBottom: "20px" }} />

      {/* Sample Approval Section */}
      <h3 style={{ color: "#555",fontSize:"24px" }}>Sample Approval</h3>

      {/* File Upload */}
      <FilePicker label="Attach" file={file} setFile={setFile} />
      <hr style={{ margin: "20px 0" }} />

      {/* Comments */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          style={{ width: "100%", height: "100px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>
      <hr style={{ marginBottom: "20px" }} />

      {/* Submit Button */}
      <div>
        <ActionButton
          label="Submit"
          onClick={() => {
            alert("Form submitted!");
          }}
        />
      </div>
    </div>
  );
};

export default SampleApprovalForm;
