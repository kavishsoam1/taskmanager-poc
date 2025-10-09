"use client";
import React, { useState } from "react";

const TanencyHandoverForm = () => {
  // Initial form state based on your JSON keys
  const initialState = {
    f11_checkbox_demising_walls: false,
    f11_outstanding_issues_dem_walls: "Comments...",
    f11_actions_demising_walls: "Comments...",
    f11_checkbox_demise_caps: false,
    f11_outstanding_issues_dem_caps: "Comments...",
    f11_actions_demise_caps: "Comments...",
    f11_checkbox_shopfront: false,
    f11_outstanding_issues_shopfront: "Comments...",
    f11_actions_shopfront: "Comments...",
    f11_checkbox_flooring: false,
    f11_outstanding_issues_flooring: "Comments...",
    f11_actions_flooring: "Comments...",
    f11_checkbox_ceiling_slab_soffit: false,
    f11_outstanding_issues_ceiling_slab: "Comments...",
    f11_actions_ceiling_slab: "Comments...",
    f11_checkbox_internal_col: false,
    f11_outstanding_issues_internal_col: "Comments...",
    f11_actions_internal_columns: "Comments...",
    f11_checkbox_isolator: false,
    f11_outstanding_issues_iso: "Comments...",
    f11_actions_iso: "Comments...",
    f11_checkbox_chilled_water_tap_off: false,
    f11_outstanding_issues_chilled_water_tap_off: "Comments...",
    f11_actions_chilled_water_tap_off: "Comments...",
    f11_checkbox_high_level_sprinklers: false,
    f11_outstanding_issues_high_level_sprinklers: "Comments...",
    f11_actions_high_level_sprinklers: "Comments...",
    f11_checkbox_smoke_detectos_operational: false,
    f11_outstanding_issues_smoke_detectors_operational: "Comments...",
    f11_actions_smoke_detect_operational: "Comments...",
    f11_checkbox_fire_alarm_conected: false,
    f11_outstanding_issues_fire_alarm_connected: "Comments...",
    f11_actions_fire_alarm_connected: "Comments...",
    f11_checkbox_smoke_ventilation: false,
    f11_outstanding_issues_smoke_ventilation: "Comments...",
    f11_actions_smoke_ventilation: "Comments...",
    f11_checkbox_tele_jun_box: false,
    f11_outstanding_issues_tele_jun_box: "Comments...",
    f11_actions_tele_jub_box: "Comments...",
    f11_checkbox_cold_water_supply: false,
    f11_outstanding_issues_cold_water_supply: "Comments...",
    f11_actions_cold_water_supply: "Comments...",
    f11_checkbox_drainage_point: false,
    f11_outstanding_issues_drainage_point: "Comments...",
    f11_actions_drainage_point: "Comments...",
    f11_checkbox_extract_system: false,
    f11_outstanding_issues_extrat_sstem: "Comments...",
    f11_actions_extract_syatm: "Comments...",
    f11_checkbox_fresh_air: false,
    f11_outstanding_issues_fresh_air: "Comments...",
    f11_actions_fresh_air: "Comments...",
    f11_checkbox_lpg: false,
    f11_outstanding_issues_lpg: "Comments...",
    f11_actions_lpg: "Comments...",
    f11_checkbox_door_opening: false,
    f11_outstanding_issues_door_opening: "Comments...",
    f11_actions_door_opening: "Comments...",
    f11_checkbox_folding_door_opening: false,
    f11_outstanding_issues_folding_door_opening: "Comments...",
    f11_actions_folding_door_opening: "Comments...",
    f11_checkbox_door_lock: false,
    f11_outstanding_issues_door_lock: "Comments...",
    f11_actions_door_lock: "Comments...",
    f11_checkbox_cnf: false,
  };

  const [formData, setFormData] = useState(initialState);

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // Handle textarea change
  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h2 className="text-4xl">Al Bahar al mutawaist rest llc</h2>
      <hr />
      <h3 className="text-2xl">Tanency Handover</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        {/** Example Section: Demising Walls */}
        <div style={{ display: "flex", marginBottom: "15px", marginTop:"20px" }}>
          <input
            type="checkbox"
            name="f11_checkbox_demising_walls"
            checked={formData.f11_checkbox_demising_walls}
            onChange={handleCheckboxChange}
            style={{ marginRight: "10px" }}
          />
          <label style={{ flex: 1 }}>Demising Walls</label>
          <textarea
            name="f11_outstanding_issues_dem_walls"
            value={formData.f11_outstanding_issues_dem_walls}
            onChange={handleTextareaChange}
            style={{ flex: 2, marginRight: "10px",border:"1px solid gray"  }}
          />
          <textarea
            name="f11_actions_demising_walls"
            value={formData.f11_actions_demising_walls}
            onChange={handleTextareaChange}
            style={{ flex: 2,border:"1px solid gray" }}
          />
        </div>

        {/** Repeat for all other sections */}
        {Object.keys(formData)
          .filter((key) => key.includes("checkbox") && key !== "f11_checkbox_demising_walls")
          .map((key) => {
            const baseKey = key.replace("checkbox", "");
            const labelText = key
              .replace("f11_checkbox_", "")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());
            return (
              <div key={key} style={{ display: "flex", marginBottom: "15px" }}>
                <input
                  type="checkbox"
                  name={key}
                  checked={formData[key]}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: "10px" }}
                />
                <label style={{ flex: 1 }}>{labelText}</label>
                <textarea
                  name={`f11_outstanding_issues${baseKey}`}
                  value={formData[`f11_outstanding_issues${baseKey}`]}
                  onChange={handleTextareaChange}
                  style={{ flex: 2, marginRight: "10px",border:"1px solid gray" }}
                />
                <textarea
                  name={`f11_actions${baseKey}`}
                  value={formData[`f11_actions${baseKey}`]}
                  onChange={handleTextareaChange}
                  style={{ flex: 2,border:"1px solid gray" }}
                />
              </div>
            );
          })}

        {/** Final Confirmation Checkbox */}
        <div style={{ marginTop: "20px" }}>
          <input
            type="checkbox"
            name="f11_checkbox_cnf"
            checked={formData.f11_checkbox_cnf}
            onChange={handleCheckboxChange}
          />
          <label style={{ marginLeft: "10px" }}>
            The Tenant hereby confirms that the above is a true and accurate record of the joint
            inspection of the shell and core completed on behalf of the Landlord.
          </label>
        </div>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TanencyHandoverForm;
