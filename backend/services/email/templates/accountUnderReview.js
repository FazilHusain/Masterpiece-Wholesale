import masterLayout from "../layouts/masterLayout.js";

const accountUnderReviewTemplate = ({
  name,
}) => {
  return masterLayout({
    title: "Application Received",

    heading: "Application Under Review",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Thank you for submitting your
      Trade Account Application.

      </p>

      <p>

      Our team has successfully received
      your application.

      </p>

      <div
      style="
      margin:35px 0;
      background:#F8F6F2;
      border-left:4px solid #B68C2F;
      padding:20px;
      ">

      <strong>

      Current Status

      </strong>

      <br><br>

      Under Review

      </div>

      <p>

      Our team usually reviews applications
      within 1–2 business days.

      </p>

      <p>

      We'll notify you immediately
      once your application has been approved
      or if additional information is required.

      </p>
    `,
  });
};

export default accountUnderReviewTemplate;