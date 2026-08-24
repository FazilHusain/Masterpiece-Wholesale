import masterLayout from "../layouts/masterLayout.js";

const sampleApprovedTemplate = ({ name }) => {
  return masterLayout({
    title: "Sample Approved",

    heading: "Sample Request Approved",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Great news!

      </p>

      <p>

      Your sample request has been approved.

      Our logistics team will prepare it for dispatch.

      </p>
    `,
  });
};

export default sampleApprovedTemplate;