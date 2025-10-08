import React from "react";

const CamundaFormPage: React.FC = () => {
  // Embed your JSON schema directly
  const formSchema = {
    "components": [
      {
        "text": "## TAR Details (To be approved by lease signatory)",
        "type": "text",
        "layout": { "row": "Row_0hgyan8", "columns": null },
        "id": "Field_0s8v2tc"
      },
      { "type": "separator", "layout": { "row": "Row_12m11h7", "columns": null }, "id": "Field_11zsyup" },
      {
        "text": "## Primary Contact",
        "type": "text",
        "layout": { "row": "Row_1xnxigq", "columns": null },
        "id": "Field_058er8l"
      },
      {
        "label": "Name",
        "type": "textfield",
        "layout": { "row": "Row_10ueiwq", "columns": null },
        "id": "Field_1h1oba5",
        "key": "f3_primary_contact_name",
        "validate": { "required": false }
      },
      {
        "label": "Designation",
        "type": "textfield",
        "layout": { "row": "Row_0xfx03a", "columns": null },
        "id": "Field_0a4im3d",
        "key": "f3_designation"
      },
      {
        "label": "Company",
        "type": "textfield",
        "layout": { "row": "Row_1owehjx", "columns": null },
        "id": "Field_1e47sdx",
        "key": "f3_company"
      },
      {
        "label": "Experience",
        "type": "textfield",
        "layout": { "row": "Row_1m56xhh", "columns": null },
        "id": "Field_1x04yer",
        "key": "f3_experience"
      },
      {
        "label": "Telephone",
        "type": "textfield",
        "layout": { "row": "Row_1ax025v", "columns": null },
        "id": "Field_1st2tig",
        "key": "f3_tel_primary_details"
      },
      {
        "label": "Email",
        "type": "textfield",
        "layout": { "row": "Row_1o3s31l", "columns": null },
        "id": "Field_0vwqkeu",
        "key": "f3_email"
      },
      { "type": "separator", "layout": { "row": "Row_07r8hd5", "columns": null }, "id": "Field_02ebgka" }
      // Add rest of your components similarly...
    ]
  };

  const formSchema1 = {
    "components": [
      
      {
        "text": "## Secondary Contact",
        "type": "text",
        "layout": { "row": "Row_1xnxigq", "columns": null },
        "id": "Field_058er8l"
      },
      {
        "label": "Name",
        "type": "textfield",
        "layout": { "row": "Row_10ueiwq", "columns": null },
        "id": "Field_1h1oba5",
        "key": "f3_primary_contact_name",
        "validate": { "required": false }
      },
      {
        "label": "Designation",
        "type": "textfield",
        "layout": { "row": "Row_0xfx03a", "columns": null },
        "id": "Field_0a4im3d",
        "key": "f3_designation"
      },
      {
        "label": "Company",
        "type": "textfield",
        "layout": { "row": "Row_1owehjx", "columns": null },
        "id": "Field_1e47sdx",
        "key": "f3_company"
      },
      {
        "label": "Experience",
        "type": "textfield",
        "layout": { "row": "Row_1m56xhh", "columns": null },
        "id": "Field_1x04yer",
        "key": "f3_experience"
      },
      {
        "label": "Telephone",
        "type": "textfield",
        "layout": { "row": "Row_1ax025v", "columns": null },
        "id": "Field_1st2tig",
        "key": "f3_tel_primary_details"
      },
      {
        "label": "Email",
        "type": "textfield",
        "layout": { "row": "Row_1o3s31l", "columns": null },
        "id": "Field_0vwqkeu",
        "key": "f3_email"
      },
      { "type": "separator", "layout": { "row": "Row_07r8hd5", "columns": null }, "id": "Field_02ebgka" }
      // Add rest of your components similarly...
    ]
  };

  const renderComponent = (component: any) => {
    switch (component.type) {
      case "text":
        if (component.text?.startsWith("##")) {
          return <h2 className="text-2xl font-bold mt-6 mb-2">{component.text.replace(/^##\s*/, "")}</h2>;
        } else if (component.text?.startsWith("###")) {
          return <h3 className="text-lg font-semibold mt-4 mb-2">{component.text.replace(/^###\s*/, "")}</h3>;
        } else if (component.text?.startsWith("####")) {
          return <h4 className="text-base font-medium mt-2">{component.text.replace(/^####\s*/, "")}</h4>;
        }
        return <p className="text-gray-700">{component.text}</p>;

      case "textfield":
        return (
          <div className="mb-4">
            {component.label && <label className="block text-sm text-gray-600 mb-1">{component.label}</label>}
            <input
              type="text"
              name={component.key}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        );

      case "select":
        return (
          <div className="mb-4">
            {component.label && <label className="block text-sm text-gray-600 mb-1">{component.label}</label>}
            <select
              name={component.key}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            >
              <option value="">Select...</option>
              {component.values?.map((v: any, idx: number) => (
                <option key={idx} value={v.value}>
                  {v.label} ({v.value})
                </option>
              ))}
            </select>
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center mb-4">
            <input type="checkbox" name={component.key} className="w-4 h-4 text-green-600 accent-green-600" />
            {component.label && <label className="ml-2 text-gray-700">{component.label}</label>}
          </div>
        );

      case "separator":
        return <hr className="my-4 border-gray-300" />;

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        {formSchema.components.map((comp: any) => (
          <div key={comp.id}>{renderComponent(comp)}</div>
        ))}
        {formSchema1.components.map((comp: any) => (
          <div key={comp.id}>{renderComponent(comp)}</div>
        ))}
        <button
          type="submit"
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CamundaFormPage;
