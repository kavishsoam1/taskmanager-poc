import React from "react";

// Mock document URLs (replace with your actual document URLs)
const documents = {
  doc1: "https://example.com/doc1.pdf",
  doc2: "https://example.com/doc2.pdf",
  doc3: "https://example.com/doc3.pdf",
  doc4: "https://example.com/doc4.pdf",
  doc6: "https://example.com/doc6.pdf",
  doc7: "https://example.com/doc7.pdf",
  doc8: "https://example.com/doc8.pdf",
  doc9: "https://example.com/doc9.pdf",
  doc10: "https://example.com/doc10.pdf",
  doc11: "https://example.com/doc11.pdf",
  doc12: "https://example.com/doc12.pdf",
  doc13: "https://example.com/doc13.pdf",
  doc14: "https://example.com/doc14.pdf",
  doc15: "https://example.com/doc15.pdf",
  doc16: "https://example.com/doc16.pdf",
  doc17: "https://example.com/doc17.pdf",
  doc18: "https://example.com/doc18.pdf",
  doc19: "https://example.com/doc19.pdf",
  doc20: "https://example.com/doc20.pdf",
  doc21: "https://example.com/doc21.pdf",
  doc22: "https://example.com/doc22.pdf",
  doc23: "https://example.com/doc23.pdf",
  doc24: "https://example.com/doc24.pdf",
  doc25: "https://example.com/doc25.pdf",
  doc26: "https://example.com/doc26.pdf",
  doc27: "https://example.com/doc27.pdf",
  doc28: "https://example.com/doc28.pdf",
};

const DocumentPreview = ({ url }) => (
  <iframe
    src={url}
    title="Document Preview"
    style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
    frameBorder="0"
  ></iframe>
);

const Separator = () => <hr style={{ margin: "20px 0" }} />;

const Field = ({ title, doc }) => (
  <div style={{ marginBottom: "20px" }}>
    <h4>{title}</h4>
    <DocumentPreview url={documents[doc]} />
  </div>
);

const MEPDesignSubmission = () => {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>MEP Design Submission</h2>
      <Separator />

      <h3>Common drawings required for all units</h3>
      <h3>Attachments</h3>
      <Separator />

      <Field title="Reflected Ceiling Plan" doc="doc1" />
      <Separator />

      <Field title="Lighting Layout" doc="doc2" />
      <Separator />

      <Field title="Power Layout" doc="doc3" />
      <Separator />

      <Field title="Load Schedule / Single Line Drawings" doc="doc4" />
      <Separator />

      <Field title="Telephone / Data Layout" doc="doc4" />
      <Separator />

      <Field title="Fire Alarm Layout (Above and Below ceiling) and Schematic" doc="doc6" />
      <Separator />

      <Field title="Emergency Light Layout" doc="doc7" />
      <Separator />

      <Field title="HVAC Layout" doc="doc8" />
      <Separator />

      <Field title="Refrigerant Piping Layout" doc="doc9" />
      <Separator />

      <Field title="Heat Load Calculation" doc="doc10" />
      <Separator />

      <Field title="Kitchen Extract Layout" doc="doc11" />
      <Separator />

      <Field title="Fresh Air Layout" doc="doc12" />
      <Separator />

      <Field title="General Ventilation Layout" doc="doc13" />
      <Separator />

      <Field title="Condensate Drain Layout" doc="doc14" />
      <Separator />

      <Field title="AC Equipment Data Sheet" doc="doc15" />
      <Separator />

      <Field title="FAHU Data Sheet" doc="doc16" />
      <Separator />

      <Field title="Ecology Unit Data Sheet" doc="doc17" />
      <Separator />

      <Field title="Kitchen Hood Data Sheet and Layout" doc="doc18" />
      <Separator />

      <Field title="Ventilation calculation / Schematic" doc="doc19" />
      <Separator />

      <Field title="Firefighting Layout" doc="doc20" />
      <Separator />

      <Field title="Water Supply Layout" doc="doc21" />
      <Separator />

      <Field title="Drainage Layout" doc="doc22" />
      <Separator />

      <Field title="Grease Trap Data Sheet" doc="doc23" />
      <Separator />

      <Field title="Natural Gas Layout" doc="doc24" />
      <Separator />

      <Field title="Fire Suppression Layout" doc="doc25" />
      <Separator />

      <Field title="Kitchen Equipment Layout" doc="doc26" />
      <Separator />

      <Field title="Smoke Extract System" doc="doc27" />
      <Separator />

      <Field title="Vendor List Compliance" doc="doc28" />
      <Separator />

      <h3>Conditions:</h3>
      <p>All changes are revised submission to be highlighted.</p>

      <div style={{ marginTop: "20px" }}>
        <label>
          <input type="checkbox" disabled /> Approve
        </label>
      </div>
    </div>
  );
};

export default MEPDesignSubmission;
