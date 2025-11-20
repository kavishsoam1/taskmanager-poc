// app/dashboard/task/pre_mob_review/page.tsx
import React from "react";

// Checkbox component
const Checkbox = ({ label, checked }: { label: string; checked: boolean }) => (
  <label style={{ display: "block", marginRight: "10px" }}>
    <input type="checkbox" checked={checked} readOnly /> {label}
  </label>
);

// Document preview component (placeholder for actual document)
const DocumentPreview = ({ dataSource }: { dataSource: string }) => (
  <div
    style={{
      border: "1px solid #ccc",
      padding: "10px",
      marginBottom: "5px",
      width: "100%",
      textAlign: "center",
    }}
  >
    {dataSource}
  </div>
);

// Main App component
const PreMobReview = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Tenant details Pre-mobilization Review</h2>
      <hr />

      <h3>Tenants</h3>
      <div>
        <p>Unit No.: <input type="text" value="Unit 101" readOnly /></p>
        <p>Unit Name: <input type="text" value="Retail Shop" readOnly /></p>
        <p>Unit Type: <input type="text" value="Commercial" readOnly /></p>
      </div>

      <h3>Company Details</h3>
      <div>
        <p>Company Name: <input type="text" value="ABC Ltd." readOnly /></p>
        <p>Telephone: <input type="text" value="+971 12345678" readOnly /></p>
        <p>Mobile: <input type="text" value="+971 98765432" readOnly /></p>
        <p>Email: <input type="text" value="abc@example.com" readOnly /></p>
      </div>

      <hr />
      <h3>Pre-mobilization requirements list</h3>
      <hr />
      <h3>CheckList</h3>

      <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr 2fr", gap: "10px", marginTop: "10px" }}>
        <div><strong>Items</strong></div>
        <div><strong>Attachments</strong></div>
        <div><strong>Availability</strong></div>

        {/* Item 1 */}
        <div>Design Approval*</div>
        <div><DocumentPreview dataSource="pre-mobDoc1.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={true} />
          <Checkbox label="No" checked={false} />
        </div>

        {/* Item 2 */}
        <div>Contractor’s All Risks Insurance with TPL and Workmen’s Compensation Certificate Copy*</div>
        <div><DocumentPreview dataSource="pre-mobDoc2.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={true} />
          <Checkbox label="No" checked={false} />
        </div>

        {/* Item 3 */}
        <div>Fit-out Work Method Statement and Risks Assessment – MSRA (full scope)*</div>
        <div><DocumentPreview dataSource="pre-mobDoc3.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={false} />
          <Checkbox label="No" checked={true} />
        </div>

        {/* Item 4 */}
        <div>HSE Safety Induction Certificate</div>
        <div><DocumentPreview dataSource="pre-mobDoc4.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={true} />
          <Checkbox label="No" checked={false} />
        </div>

        {/* Item 5 */}
        <div>Contractor’s HSE Plan*</div>
        <div><DocumentPreview dataSource="pre-mobDoc5.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={false} />
          <Checkbox label="No" checked={true} />
        </div>

        {/* Item 6 */}
        <div>HSE Certified Personnel’s Valid ID or Certificate</div>
        <div><DocumentPreview dataSource="pre-mobDoc6.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={true} />
          <Checkbox label="No" checked={false} />
        </div>

        {/* Item 7 */}
        <div>Program of Works*</div>
        <div><DocumentPreview dataSource="pre-mobDoc7.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={true} />
          <Checkbox label="No" checked={false} />
        </div>

        {/* Item 8 */}
        <div>Temporary power and water for fit-out use (to advise applicable fees, if any)</div>
        <div><DocumentPreview dataSource="pre-mobDoc8.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={false} />
          <Checkbox label="No" checked={true} />
        </div>

        {/* Item 9 */}
        <div>Landlord’s Work Permit Application (Fit-out Work Permit and Hot-work*</div>
        <div><DocumentPreview dataSource="pre-mobDoc9.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={true} />
          <Checkbox label="No" checked={false} />
        </div>

        {/* Item 10 */}
        <div>Municipality/Civil Defence Approved Drawings</div>
        <div><DocumentPreview dataSource="pre-mobDoc10.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={false} />
          <Checkbox label="No" checked={true} />
        </div>

        {/* Item 11 */}
        <div>Others</div>
        <div><DocumentPreview dataSource="pre-mobDoc11.pdf" /></div>
        <div>
          <Checkbox label="Yes" checked={true} />
          <Checkbox label="No" checked={false} />
        </div>

        {/* Comments */}
        <div>Comments</div>
        <div>
          <textarea value="Comments..." readOnly style={{ width: "100%", height: "80px" }} />
        </div>
        <div></div>
      </div>

      <hr />
      <div>
        <Checkbox label="Approve" checked={true} />
      </div>
    </div>
  );
};

export default PreMobReview;
