import masterLayout from "../layouts/masterLayout.js";

const orderStatusTemplate = ({
  name,
  orderNumber,
  status,
  message,
  trackingNumber = "",
}) => {
  return masterLayout({
    title: `Order ${status}`,

    heading: `Order ${status}`,

    greeting: `Hello ${name},`,

    content: `
      <p>

      Order Number

      <strong>

      ${orderNumber}

      </strong>

      </p>

      <p>

      Status

      <strong>

      ${status}

      </strong>

      </p>

      ${
        trackingNumber
          ? `
      <p>

      Tracking Number

      <strong>

      ${trackingNumber}

      </strong>

      </p>
      `
          : ""
      }

      <p>

      ${message}

      </p>
    `,
  });
};

export default orderStatusTemplate;