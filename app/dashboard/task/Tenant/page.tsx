"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface ConceptualDesignFormProps {
  initialData?: Record<string, string>;
  onSubmit?: (formData: FormData) => void;
}

interface FileState {
  drawing: File | null;
  furniture_layout_plan: File | null;
  sign: File | null;
  photoOfShop: File | null;
  tvrForm_9: File | null;
  shopFront_3deimage: File | null;
  shopFront_Elevation: File | null;
}

interface ErrorState {
  [key: string]: string | null;
}

const ConceptualDesignForm: React.FC<ConceptualDesignFormProps> = ({
  initialData = {},
  onSubmit,
}) => {
  const [files, setFiles] = useState<FileState>({
    drawing: null,
    furniture_layout_plan: null,
    sign: null,
    photoOfShop: null,
    tvrForm_9: null,
    shopFront_3deimage: null,
    shopFront_Elevation: null,
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const requiredKeys: (keyof FileState)[] = [
    "drawing",
    "furniture_layout_plan",
    "sign",
    "shopFront_3deimage",
    "shopFront_Elevation",
  ];

  function handleFileChange(
    key: keyof FileState,
    event: ChangeEvent<HTMLInputElement>
  ): void {
    const file =
      event.target.files && event.target.files[0]
        ? event.target.files[0]
        : null;
    setFiles((prev) => ({ ...prev, [key]: file }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  }

  function validate(): boolean {
    const next: ErrorState = {};
    requiredKeys.forEach((k) => {
      if (!files[k]) next[k] = "This file is required.";
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    Object.entries(files).forEach(([k, v]) => {
      if (v) fd.append(k, v);
    });

    [
      "tenant_name",
      "unit_No",
      "name",
      "unit_type",
      "comapany",
      "tel",
      "mob",
      "email",
    ].forEach((k) => fd.append(k, initialData[k] ?? ""));

    if (onSubmit) {
      onSubmit(fd);
    } else {
      const summary: Record<string, string | null> = {};
      Object.keys(files).forEach(
        (k) => (summary[k] = files[k as keyof FileState]?.name ?? null)
      );
      console.log("Submitting Conceptual Design form", summary);
      alert(
        "Form validated and ready to submit (check console).\nFiles: " +
          JSON.stringify(summary, null, 2)
      );
    }
  }

  function renderReadonly(key: string, label: string): JSX.Element {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm text-slate-700">{label}</label>
        <input
          readOnly
          value={initialData[key] ?? ""}
          className="rounded-md border px-3 py-2 bg-slate-50 text-sm"
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-sm"
    >
      <h3 className="text-teal-700 text-lg font-semibold mb-2">
        Tenant Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {renderReadonly("tenant_name", "Tenant")}
        {renderReadonly("unit_No", "Unit no.")}
        {renderReadonly("name", "Unit Name")}
        {renderReadonly("unit_type", "Unit Type")}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {renderReadonly("comapany", "Company Name")}
        {renderReadonly("tel", "Telephone")}
        {renderReadonly("mob", "Mobile")}
        {renderReadonly("email", "Email")}
      </div>

      <hr className="my-4" />

      <h4 className="text-lg font-medium mb-2">
        Conceptual design Submission
      </h4>

      <p className="text-sm text-slate-600 mb-3">
        Submittal checklist — Attachment (pdf, jpg or png — 20MB Max)
      </p>

      {/* Drawing Upload */}
      <section className="mb-6">
        <label className="block text-sm font-medium mb-1">
          1 set of all drawings - softcopy in PDF format *
        </label>
        <input
          accept=".pdf,.jpg,.png"
          required
          onChange={(e) => handleFileChange("drawing", e)}
          type="file"
          className="block w-full text-sm"
        />
        {errors.drawing && (
          <p className="text-xs text-red-600 mt-1">{errors.drawing}</p>
        )}
      </section>

      {/* Furniture layout plan */}
      <section className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Furniture layout plan - with merchandising and services *
        </label>
        <input
          accept=".pdf,.jpg,.png"
          required
          onChange={(e) => handleFileChange("furniture_layout_plan", e)}
          type="file"
          className="block w-full text-sm"
        />
        {errors.furniture_layout_plan && (
          <p className="text-xs text-red-600 mt-1">
            {errors.furniture_layout_plan}
          </p>
        )}
      </section>

      {/* Signage */}
      <section className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Shop front Elevation - with SIGNAGE *
        </label>
        <input
          accept=".pdf,.jpg,.png"
          required
          onChange={(e) => handleFileChange("sign", e)}
          type="file"
          className="block w-full text-sm"
        />
        {errors.sign && (
          <p className="text-xs text-red-600 mt-1">{errors.sign}</p>
        )}
      </section>

      <hr className="my-4" />

      {/* Optional files */}
      <section className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Photos of previous shops or anything that helps explain the concept
          (optional)
        </label>
        <input
          accept=".jpg,.png,.pdf"
          onChange={(e) => handleFileChange("photoOfShop", e)}
          type="file"
          className="block w-full text-sm"
        />
      </section>

      <section className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Tenant Variation Request (TVR - Form 09) (optional)
        </label>
        <input
          accept=".pdf,.jpg,.png"
          onChange={(e) => handleFileChange("tvrForm_9", e)}
          type="file"
          className="block w-full text-sm"
        />
      </section>

      <hr className="my-4" />

      {/* Shop front 3D image */}
      <section className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Shop front - with signage - 3D image - in colour *
        </label>
        <input
          accept=".jpg,.png,.pdf"
          required
          onChange={(e) => handleFileChange("shopFront_3deimage", e)}
          type="file"
          className="block w-full text-sm"
        />
        {errors.shopFront_3deimage && (
          <p className="text-xs text-red-600 mt-1">
            {errors.shopFront_3deimage}
          </p>
        )}
      </section>

      {/* Shop front elevation */}
      <section className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Shop front Elevation *
        </label>
        <input
          accept=".pdf,.jpg,.png"
          required
          onChange={(e) => handleFileChange("shopFront_Elevation", e)}
          type="file"
          className="block w-full text-sm"
        />
        {errors.shopFront_Elevation && (
          <p className="text-xs text-red-600 mt-1">
            {errors.shopFront_Elevation}
          </p>
        )}
      </section>

      <hr className="my-4" />

      {/* Conditions */}
      <div className="mb-6">
        <h5 className="font-semibold">Conditions</h5>
        <ol className="list-decimal list-inside text-sm text-slate-700 mt-2 space-y-1">
          <li>
            Minimum requirements as indicated by an asterisk (*) for a submission
            to be accepted as per Lease.
          </li>
          <li>All changed or revised submissions to be highlighted.</li>
        </ol>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 rounded-2xl bg-teal-600 text-white text-sm shadow"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            setFiles({
              drawing: null,
              furniture_layout_plan: null,
              sign: null,
              photoOfShop: null,
              tvrForm_9: null,
              shopFront_3deimage: null,
              shopFront_Elevation: null,
            });
            setErrors({});
          }}
          className="px-4 py-2 rounded-2xl border text-sm"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default ConceptualDesignForm;
