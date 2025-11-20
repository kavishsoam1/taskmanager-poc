// File: CloseOutFormReadOnly.js
import React from "react";

const CloseOutFormReadOnly = () => {
  // Sample data (replace with real data from API or props)
  const data = {
    designSnag: "Design issues resolved",
    smNOC: "Approved",
    foodHealth: "Approved",
    tenancyContract: "Uploaded",
    tradeLicense: "Valid",
    smDecor: "Completed",
    scdCert: "Completed",
    scdHoe: "Safe",
    sewaCert: "Connected",
    sedApproval: "Approved",
    localAuthority: "Stamped",
    sewaAccount: "Transferred",
    generalComment: "All documents verified",
    files: {
      designSnagFile: "design_snag.pdf",
      smNOCFile: "sm_noc.pdf",
      foodHealthFile: "food_health.pdf",
      tenancyContractFile: "tenancy_contract.pdf",
      tradeLicenseFile: "trade_license.pdf",
      smDecorFile: "sm_decor.pdf",
      scdCertFile: "scd_certificate.pdf",
      scdHoeFile: "scd_hoe.pdf",
      sewaCertFile: "sewa_cert.pdf",
      sedApprovalFile: "sed_approval.pdf",
      localAuthorityFile: "local_authority.pdf",
      sewaAccountFile: "sewa_account.pdf",
    },
  };

  const renderRow = (label, value, fileKey) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
      }}
    >
      <div style={{ flex: 2, fontWeight: "bold" }}>{label}</div>
      <div style={{ flex: 1, textAlign: "center" }}>Yes</div>
      <div style={{ flex: 2, textAlign: "center", fontStyle: "italic" }}>
        {data.files[fileKey]}
      </div>
      <div style={{ flex: 3, paddingLeft: "10px" }}>{value}</div>
    </div>
  );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px", fontSize:"24px" }}>
        Al Bahar al mutawasit rtest llc
      </h3>
      <hr style={{ marginBottom: "20px" }} />

      <h4 style={{ marginBottom: "15px" }}>
        Close-out documents checklist for F&B units
      </h4>

      {renderRow("Design Based Snag list", data.designSnag, "designSnagFile")}
      {renderRow("SM Grease Trap/Drainage NOC", data.smNOC, "smNOCFile")}
      {renderRow(
        "Food/Health Inspection Approval Report",
        data.foodHealth,
        "foodHealthFile"
      )}
      {renderRow("Tenancy Contract", data.tenancyContract, "tenancyContractFile")}
      {renderRow("Trade License", data.tradeLicense, "tradeLicenseFile")}
      {renderRow(
        "SM Décor Completion Certificate",
        data.smDecor,
        "smDecorFile"
      )}
      {renderRow("SCD Completion Certificate", data.scdCert, "scdCertFile")}
      {renderRow("SCD/HOE Safety Certificate", data.scdHoe, "scdHoeFile")}
      {renderRow(
        "SEWA Natural Gas (NG) Certificate",
        data.sewaCert,
        "sewaCertFile"
      )}
      {renderRow(
        "SED Approval (SED Form with Signage approval stamped)",
        data.sedApproval,
        "sedApprovalFile"
      )}
      {renderRow(
        "Local Authority drawings approvals",
        data.localAuthority,
        "localAuthorityFile"
      )}
      {renderRow(
        "SEWA Account Transfer document on Tenant’s Name",
        data.sewaAccount,
        "sewaAccountFile"
      )}

      <hr style={{ margin: "20px 0" }} />
      <h4 style={{ marginBottom: "10px" }}>General Comments</h4>
      <p
        style={{
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        {data.generalComment}
      </p>
    </div>
  );
};

export default CloseOutFormReadOnly;
