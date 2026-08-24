import masterLayout from "../layouts/masterLayout.js";

const sampleRejectedTemplate = ({
  name,
  reason,
}) => {
  return masterLayout({
    title: "Sample Request Update",

    heading: "Sample Request Rejected",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Unfortunately, your sample request
      could not be approved.

      </p>

      ${
        reason
          ? `
      <p>

      <strong>Reason</strong>

      <br>

      ${reason}

      </p>
      `
          : ""
      }

      <p>

      For further assistance,
      please contact our support team.

      </p>
    `,
  });
};

export default sampleRejectedTemplate;