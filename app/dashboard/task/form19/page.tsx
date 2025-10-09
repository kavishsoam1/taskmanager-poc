// App.jsx
import React from "react";

const App = () => {
  const data = {
    conceptual: { days: 5, milestoneDate: "2025-10-01", actualDate: "2025-10-03", delayDays: 2, amount: 1000 },
    mep: { days: 7, milestoneDate: "2025-10-05", actualDate: "2025-10-07", delayDays: 2, amount: 1500 },
    finalDesign: { days: 10, milestoneDate: "2025-10-10", actualDate: "2025-10-12", delayDays: 2, amount: 2000 },
    permit: { days: 3, milestoneDate: "2025-10-15", actualDate: "2025-10-16", delayDays: 1, amount: 500 },
    handover: { days: 2, milestoneDate: "2025-10-18", actualDate: "2025-10-19", delayDays: 1, amount: 300 },
    mobilization: { days: 1, milestoneDate: "2025-10-20", actualDate: "2025-10-20", delayDays: 0, amount: 0 },
    chargeableAmount: 5300,
    summaryChecks: ["Landlord works affecting the Tenancy", "Obtaining permits from Authorities", "Force Majeure"],
    generalComment: "This is a general comment about the late opening penalty.",
    attachFile: { name: "document.pdf", url: "/files/document.pdf" }
  };

  const renderSection = (title, values) => (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="font-semibold">Days</label>
          <div>{values.days}</div>
        </div>
        <div>
          <label className="font-semibold">Milestone Date</label>
          <div>{values.milestoneDate}</div>
        </div>
        <div>
          <label className="font-semibold">Actual Date</label>
          <div>{values.actualDate}</div>
        </div>
        <div>
          <label className="font-semibold">Delay Days (C-D)</label>
          <div>{values.delayDays}</div>
        </div>
        <div>
          <label className="font-semibold">Amount</label>
          <div>{values.amount}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Late Opening Penalty Summary</h2>

      {renderSection("Conceptual Design Submission", data.conceptual)}
      {renderSection("MEP Submission", data.mep)}
      {renderSection("Final Design Submission", data.finalDesign)}
      {renderSection("Permit / Authority Submission", data.permit)}
      {renderSection("Handover", data.handover)}
      {renderSection("Mobilization / Start-on-site", data.mobilization)}

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Chargeable Amount</h3>
        <div>{data.chargeableAmount}</div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Summary</h3>
        <ul className="list-disc pl-5 space-y-1">
          {data.summaryChecks.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">General Comments</h3>
        <p className="whitespace-pre-wrap">{data.generalComment}</p>
        {data.attachFile && (
          <p className="mt-2">
            Attached File:{" "}
            <a href={data.attachFile.url} className="text-blue-600 underline" target="_blank" rel="noreferrer">
              {data.attachFile.name}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
