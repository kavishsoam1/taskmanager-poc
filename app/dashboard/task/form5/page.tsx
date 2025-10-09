"use client";

import React from "react";

const TenantPage: React.FC = () => {
  const data = {
    allDrawing: "/path/to/allDrawing.pdf",
    TVR_form_9: "/path/to/TVR_form_9.pdf",
    materialsDrwaing: "/path/to/materialsDrwaing.pdf",
    sampleBoard: "/path/to/sampleBoard.jpg",
    sampleMaterial: "/path/to/sampleMaterial.png",
    f5Doc1: "/path/to/f5Doc1.pdf",
    f5doc2: "/path/to/f5doc2.pdf",
    f5doc3: "/path/to/f5doc3.pdf",
    f5doc4: "/path/to/f5doc4.pdf",
    f5doc5: "/path/to/f5doc5.pdf",
    f5doc6: "/path/to/f5doc6.pdf",
    f5doc7: "/path/to/f5doc7.pdf",
    f5doc8: "/path/to/f5doc8.pdf",
    f5doc9: "/path/to/f5doc9.pdf",
    f5doc10: "/path/to/f5doc10.pdf",
  };

  const renderDocument = (label: string, filePath: string) => {
    if (!filePath) return <p style={{ color: "red" }}>No document available</p>;

    const fileType = filePath.split(".").pop()?.toLowerCase();

    return (
      <div style={{ marginTop: "8px", marginBottom: "20px" }}>
        <h4>{label}</h4>
        {fileType === "pdf" ? (
          <iframe
            src={filePath}
            width="100%"
            height="400px"
            title={label}
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        ) : (
          <img
            src={filePath}
            alt={label}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1 className="text-4xl">Architectural Details Design Submission Approval</h1>
      <hr />
      <h3 className="text-2xl">Standard Required</h3>
      <h3 className="text-2xl">Attachment (pdf, jpg or png – 5MB Max)</h3>
      <hr />

      {renderDocument("1 set of all drawings – softcopy in PDF format", data.allDrawing)}
      {renderDocument("Tenant variation request (TVR – Form 09)", data.TVR_form_9)}
      {renderDocument("Materials are clearly referenced on drawings", data.materialsDrwaing)}
      {renderDocument("Sample board doesn’t exceed 50cm X 35cm", data.sampleBoard)}
      {renderDocument("Actual material samples to be included – submit 1 set", data.sampleMaterial)}
      <hr />

      <h3>Checklist of Documents Required</h3>
      {renderDocument("Furniture layout plan – with merchandising and services (DB&FAP)*", data.f5Doc1)}
      {renderDocument("Flooring plan*", data.f5doc2)}
      {renderDocument(
        "Reflected ceiling plan with lighting, AC diffusers, smoke detectors, sprinklers, speakers*",
        data.f5doc3
      )}
      {renderDocument("Interior section elevations (all)", data.f5doc4)}
      {renderDocument(
        "Shop front workshop drawings – Including SIGNAGE installation details & interface details with landlord finishes*",
        data.f5doc5
      )}
      {renderDocument(
        "Signage package (interior, shop front & exterior) – including package for submittal to statutory Authorities for approval",
        data.f5doc6
      )}
      {renderDocument(
        "Shop front sections (at least 1 through entrance and 1 through window display)*",
        data.f5doc7
      )}
      {renderDocument("Updated shopfront – 3D images in color", data.f5doc8)}
      {renderDocument("Schedule of material finishes as referenced on the drawings*", data.f5doc9)}
      {renderDocument("Updated Interior 3D Images", data.f5doc10)}

      <hr />
      <h3>Conditions:</h3>
      <p>1. Minimum requirements as indicated by an asterisk (*) for a submission to be accepted as per Lease.</p>
      <p>2. All changes in revised submissions to be highlighted.</p>

      <hr />
      <div style={{ marginTop: "20px" }}>
        <label>
          <input type="checkbox" /> Approve
        </label>
      </div>
    </div>
  );
};

export default TenantPage;
