import React from "react";

interface Field {
  label: string;
  value?: string;
}

interface SubItem {
  label: string;
  checked?: boolean;
  date?: string;
}

interface SubSection {
  name: string;
  items?: SubItem[];
}

interface Section {
  title: string;
  fields?: Field[];
  subsections?: SubSection[];
}

const CriticalPathDocumentsView: React.FC = () => {
  const formData = {
    tenant_name: "ABC Trading LLC",
    unit_No: "A-102",
    name: "Downtown Plaza",
    unit_type: "Retail",
    comapany: "ABC Group",
    tel: "045678900",
    mob: "0501234567",
    email: "john.doe@abc.com",
    cpd_docs_attach: "critical-path-docs.pdf",
    cpd_docs_comments: "All approvals received. Final inspection pending.",
  };

  const sections: Section[] = [
    {
      title: "Tenant Details",
      fields: [
        { label: "Tenant", value: formData.tenant_name },
        { label: "Unit No.", value: formData.unit_No },
        { label: "Unit Name", value: formData.name },
        { label: "Unit Type", value: formData.unit_type },
      ],
    },
    {
      title: "Contact Details",
      fields: [
        { label: "Company Name", value: formData.comapany },
        { label: "Telephone", value: formData.tel },
        { label: "Mobile", value: formData.mob },
        { label: "Email", value: formData.email },
      ],
    },
    {
      title: "Critical Path Documents",
      subsections: [
        {
          name: "Design",
          items: [
            { label: "Kick-off meeting / Project handover", checked: true, date: "2025-09-01" },
            { label: "Concept design submission", checked: false, date: "2025-09-05" },
            { label: "Arch detailed design submission", checked: true, date: "2025-09-10" },
            { label: "MEP design submission", checked: true, date: "2025-09-15" },
          ],
        },
        {
          name: "Authority",
          items: [
            { label: "Civil defense approval", checked: true, date: "2025-09-20" },
            { label: "Municipality Fit-out Permit", checked: false, date: "2025-09-25" },
            { label: "SEWA / Water and Power Approval", checked: true, date: "2025-09-28" },
          ],
        },
        {
          name: "Execution",
          items: [
            { label: "Site Mobilization", checked: true, date: "2025-10-01" },
            { label: "Fit-out Workers", checked: true, date: "2025-10-03" },
            { label: "Final Inspection", checked: false, date: "2025-10-05" },
            { label: "Sang Completion", checked: false, date: "2025-10-07" },
            { label: "Handover of all Approval", checked: false, date: "2025-10-09" },
            { label: "Merchandising Start", checked: false, date: "2025-10-12" },
            { label: "Trade Date", checked: false, date: "2025-10-15" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Critical Path Documents
      </h2>

      {/* Tenant + Contact Sections */}
      {sections.slice(0, 2).map((section, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            {section.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.fields?.map((field, i) => (
              <div
                key={i}
                className="border rounded-lg p-3 bg-gray-50 flex flex-col"
              >
                <span className="text-sm text-gray-500">{field.label}</span>
                <span className="font-medium text-gray-800">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Critical Path Documents */}
      <div className="border-t pt-6">
        {sections[2].subsections?.map((sub, idx) => (
          <div key={idx} className="mb-6">
            <h4 className="text-lg font-semibold text-green-700 mb-3">
              {sub.name}
            </h4>
            <div className="space-y-3">
              {sub.items?.map((item, j) => (
                <div
                  key={j}
                  className="flex justify-between items-center border rounded-lg px-4 py-3 bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!item.checked}
                      readOnly
                      className="w-4 h-4 text-green-600 accent-green-600"
                    />
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {item.date ?? "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Attachments */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Attachment</h3>
        <a
          href={`/${formData.cpd_docs_attach}`}
          target="_blank"
          rel="noreferrer"
          className="text-green-700 underline font-medium"
        >
          📎 {formData.cpd_docs_attach}
        </a>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Comments</h3>
        <div className="border rounded-lg p-3 bg-gray-50 text-gray-700">
          {formData.cpd_docs_comments}
        </div>
      </div>
    </div>
  );
};

export default CriticalPathDocumentsView;
