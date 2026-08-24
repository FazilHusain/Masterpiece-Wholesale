import masterLayout from "../layouts/masterLayout.js";

const sampleStatusTemplate = ({
  name,
  orderNumber,
  status,
  message,
}) => {
  return masterLayout({
    title: `Sample ${status}`,

    heading: `Sample ${status}`,

    greeting: `Hello ${name},`,

    content: `
      <p>

      Sample Order

      <strong>

      ${orderNumber}

      </strong>

      </p>

      <p>

      Current Status

      <strong>

      ${status}

      </strong>

      </p>

      <p>

      ${message}

      </p>
    `,
  });
};

export default sampleStatusTemplate;