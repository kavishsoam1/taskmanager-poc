"use client";

import React, { useState } from "react";

const InspectionForm = () => {
  const [formData, setFormData] = useState({
    date_pre_celling_clouser_Inspection: "",
    allOpening_Comments: "",
    Opening: "",
    accessPanel_comments: "",
    accessPanel: "",
    f14_cd_drae_approval_status: "",
    f14_select_cd_draw_appr_status: "",
    f14_sensor_led_indicator: "",
    f14_select_led_indicator: "",
    f14_allFireAlarm: "",
    f14_select_allFireAlarm_insatlled: "",
    f14_alarmDeviceWiringCompleted: "",
    f14_select_fireAlarmDevices: "",
    f14_sd_cap_removed: "",
    f14_select_sd_cap_removed: "",
    f14_point_wiring_light: "",
    f14_select_wiring_mrg_light_comp: "",
    f14_magger_test: "",
    f14_select_magger_completed: "",
    f14_pf_sensors_installed: "",
    f14_select_pf_sensors_nstalled: "",
    FFS_approval_status: "",
    FFS_approval_select: "",
    LED_indicator: "",
    LED_indicator_select: "",
    allFAI_install: "",
    allFAI_Unit_select: "",
    fire_alarm_devices: "",
    fire_alarm_device_select: "",
    FSSI_pining_panel: "",
    FSSI_pipning_panel_select: "",
    emergency_switch: "",
    emergency_switch_select: "",
    NGS_piping_sensors: "",
    NGS_piping_sensors_select: "",
    SEWA_NG_approval_status: "",
    SEWA_NG_approval_select: "",
    AC_ducting: "",
    AC_ducting_select: "",
    CDP_install: "",
    no_CDP_instal_select: "",
    WSD_drain_WH: "",
    WSD_drain_wh_select: "",
    WSD_ws_test: "",
    WSD_ws_select_no: "",
    WSD_water_supply: "",
    WSD_WSP_select_no: "",
    wsd_ppr_ws_distribution: "",
    wsd_ppr_ws_select_no: "",
    elect_wiring_light_power: "",
    elect_wiring_select_no: "",
    elect_socket_isolators: "",
    elect_installed_socket_isolators_select: "",
    elect_wire_installed_light: "",
    elect_wire_installed_light_select_no: "",
    elect_test: "",
    elect_test_select_no: "",
    tel_comments: "",
    tel_select: "",
    Insp_req_f14: null,
    f14_comments: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inspection Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Field */}
        <div>
          <label>Pre-celling Clouser Inspection Date</label>
          <input
            type="date"
            value={formData.date_pre_celling_clouser_Inspection}
            onChange={(e) =>
              handleChange("date_pre_celling_clouser_Inspection", e.target.value)
            }
            className="border p-2 w-full"
          />
        </div>

        {/* Textarea Field */}
        <div>
          <label>All Opening Comments</label>
          <textarea
            value={formData.allOpening_Comments}
            onChange={(e) => handleChange("allOpening_Comments", e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Select Field */}
        <div>
          <label>Opening</label>
          <select
            value={formData.Opening}
            onChange={(e) => handleChange("Opening", e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select</option>
            <option value="value">Value</option>
            <option value="value2">Value 2</option>
            <option value="value3">Value 3</option>
          </select>
        </div>

        {/* Repeat Textarea + Select fields for all keys */}
        {/* Example for accessPanel */}
        <div>
          <label>Access Panel/Platform Comments</label>
          <textarea
            value={formData.accessPanel_comments}
            onChange={(e) => handleChange("accessPanel_comments", e.target.value)}
            className="border p-2 w-full"
          />
          <label>Access Panel Selection</label>
          <select
            value={formData.accessPanel}
            onChange={(e) => handleChange("accessPanel", e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select</option>
            <option value="value">Value</option>
            <option value="value2">Value 2</option>
            <option value="value3">Value 3</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label>Attach Files</label>
          <input
            type="file"
            onChange={(e) => handleChange("Insp_req_f14", e.target.files[0])}
            className="border p-2 w-full"
          />
        </div>

        {/* Single line text */}
        <div>
          <label>Comments</label>
          <input
            type="text"
            required
            value={formData.f14_comments}
            onChange={(e) => handleChange("f14_comments", e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InspectionForm;
