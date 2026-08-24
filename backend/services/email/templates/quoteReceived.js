import masterLayout from "../layouts/masterLayout.js";

const quoteReceivedTemplate = ({ name }) => {
  return masterLayout({
    title: "Quote Request Received",

    heading: "Quotation Request Received",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Thank you for requesting a quotation.

      </p>

      <p>

      Our sales team has received your request.

      </p>

      <p>

      We'll prepare your quotation and contact you shortly.

      </p>
    `,
  });
};

export default quoteReceivedTemplate;