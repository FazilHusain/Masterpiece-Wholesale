import masterLayout from "../layouts/masterLayout.js";

const wholesaleReceivedTemplate = ({ name, applicationNumber }) => {
  return masterLayout({
    title: "Application Received",

    heading: "Wholesale Application Received",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Thank you for applying to become a
      <strong>His Masterpiece Wholesale Partner.</strong>

      </p>

      <p>

      Your application has been received successfully.

      </p>

      <p>

      <strong>Application Number:</strong>

      ${applicationNumber}

      </p>

      <p>

      Status:
      <strong>Pending Review</strong>

      </p>

      <p>

      Our team will review your application
      and notify you once the review is complete.

      </p>
    `,
  });
};

export default wholesaleReceivedTemplate;