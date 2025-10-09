"use client";
import React, { useState } from "react";

const initialForm = {
  f16_date: "",
  f16_mep_opeing: "",
  f16_mep_access_panel: "",
  f16_fls_certificates: "",
  f16_fire_alarm_report: "",
  f16_fire_alarm_cause_effect: "",
  f16_interfacing_facp: "",
  f16_fire_alarm_install_device: "",
  f16_led_indicator: "",
  f16_access_panels: "",
  f16_fad_cap_removed: "",
  f16_functional: "",
  f16_emeg_testing_light: "",
  f16_ffs_zone_control: "",
  f16_ffs_sprinklers_installed: "",
  f16_ffs_zcv_label: "",
  f16_ffs_sprinelr_shields_removed: "",
  f16_ffs_exti_blanket: "",
  f16_fss_installed: "",
  f16_fss_commissioned: "",
  f16_fss_panel_cylinder_install: "",
  f16_fss_emergency_push_swich: "",
  f16_ng_natural_gas_system: "",
  f16_ng_natural_gas_comm: "",
  f16_ng_sewa: "",
  f16_mis_equipments: "",
  f16_mis_cdp_connected: "",
  f16_mis_ref_pipr_nstalled: "",
  f16_mis_mahu: "",
  f16_mis_sand_trap_installed: "",
  f16_mis_kitchen_hood: "",
  f16_mis_louvers: "",
  f16_mis_ac_install: "",
  f16_mis_air_balancing: "",
  f16_mis_closeout_doc_submit: "",
  fs16_wsd_panel_stub_out: "",
  f16_wsd_chlorination: "",
  f16_wsd_drain_wh: "",
  f16_wsd_grease_trap: "",
  f16_wsd_final_fix_installed: "",
  f16_ele_cableTray_installed: "",
  f16_ele_iso_cw_connection: "",
  f16_ele_cableTray_cover_install: "",
  f16_ele_labelling_completed: "",
  f16_ele_earthing_done: "",
  f16_live_test: "",
  f16_tel_data: "",
  f16_tel_commissionng: "",
  f16_site_select: "",
  f16_gen_comments: ""
};

const FinalMEPInspectionForm = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Form submitted! Check console for values.");
  };

  const inputClass =
    "border border-gray-400 rounded-md p-2 w-full mb-4 focus:outline-none focus:border-blue-500";

  const sectionClass = "mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">Final MEP Inspection Checklist</h2>

      {/* Date Section */}
      <div className={sectionClass}>
        <label className="block mb-1 font-semibold">Inspection Date</label>
        <input
          type="date"
          name="f16_date"
          value={form.f16_date}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* MEP Items Section */}
      <div className={sectionClass}>
        <h3 className="font-bold mb-2">MEP Items</h3>

        <label>All opening to be sealed</label>
        <input
          type="text"
          name="f16_mep_opeing"
          value={form.f16_mep_opeing}
          onChange={handleChange}
          className={inputClass}
        />

        <label>All access panel to be labelled</label>
        <input
          type="text"
          name="f16_mep_access_panel"
          value={form.f16_mep_access_panel}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Fire Alarm System Section */}
      <div className={sectionClass}>
        <h3 className="font-bold mb-2">Fire Alarm System</h3>

        <label>FLS Safety Certificate</label>
        <input
          type="text"
          name="f16_fls_certificates"
          value={form.f16_fls_certificates}
          onChange={handleChange}
          className={inputClass}
        />

        <label>Fire Alarm Commissioning Report</label>
        <input
          type="text"
          name="f16_fire_alarm_report"
          value={form.f16_fire_alarm_report}
          onChange={handleChange}
          className={inputClass}
        />

        <label>Fire Alarm Interfacing / Cause & Effect</label>
        <input
          type="text"
          name="f16_fire_alarm_cause_effect"
          value={form.f16_fire_alarm_cause_effect}
          onChange={handleChange}
          className={inputClass}
        />

        <label>Interfacing tenant FACP with landlord FACP</label>
        <input
          type="text"
          name="f16_interfacing_facp"
          value={form.f16_interfacing_facp}
          onChange={handleChange}
          className={inputClass}
        />

        <label>Installation of all Fire Alarm devices complete</label>
        <input
          type="text"
          name="f16_fire_alarm_install_device"
          value={form.f16_fire_alarm_install_device}
          onChange={handleChange}
          className={inputClass}
        />

        <label>Void sensor with remote LED Indicator</label>
        <input
          type="text"
          name="f16_led_indicator"
          value={form.f16_led_indicator}
          onChange={handleChange}
          className={inputClass}
        />

        <label>Access Panels for void sensors and IFUs</label>
        <input
          type="text"
          name="f16_access_panels"
          value={form.f16_access_panels}
          onChange={handleChange}
          className={inputClass}
        />

        <label>Fire alarm Detectors Caps removed</label>
        <input
          type="text"
          name="f16_fad_cap_removed"
          value={form.f16_fad_cap_removed}
          onChange={handleChange}
          className={inputClass}
        />

        <label>All emergency Light installed and functional</label>
        <input
          type="text"
          name="f16_functional"
          value={form.f16_functional}
          onChange={handleChange}
          className={inputClass}
        />

        <label>Emergency light testing</label>
        <input
          type="text"
          name="f16_emeg_testing_light"
          value={form.f16_emeg_testing_light}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Fire Fighting, Suppression, Gas, Misc, Water, Electrical, Telephone Sections */}
      {/* You can repeat the same pattern as above for all remaining fields */}

      {/* Site Acceptance */}
      <div className={sectionClass}>
        <label>Site acceptance</label>
        <select
          name="f16_site_select"
          value={form.f16_site_select}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select</option>
          <option value="value">Value</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>

        <label>Comments</label>
        <input
          type="text"
          name="f16_gen_comments"
          value={form.f16_gen_comments}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default FinalMEPInspectionForm;
