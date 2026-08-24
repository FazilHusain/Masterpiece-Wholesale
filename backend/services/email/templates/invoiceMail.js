import masterLayout from "../layouts/masterLayout.js";

const invoiceMailTemplate = ({
  name,
  orderNumber,
}) => {
  return masterLayout({
    title: "Invoice",

    heading: "Invoice Attached",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Thank you for your purchase.

      </p>

      <p>

      Your invoice for

      <strong>

      ${orderNumber}

      </strong>

      is attached with this email.

      </p>

      <p>

      Please keep it for your records.

      </p>
    `,
  });
};

export default invoiceMailTemplate;