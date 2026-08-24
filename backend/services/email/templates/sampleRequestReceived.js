import masterLayout from "../layouts/masterLayout.js";

const sampleRequestReceivedTemplate = ({
  name,
  orderNumber,
}) => {
  return masterLayout({
    title: "Sample Request Received",

    heading: "Your Sample Request Has Been Received",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Thank you for requesting a product sample.

      </p>

      <p>

      Your request has been received successfully.

      </p>

      <p>

      <strong>Sample Order No.</strong>

      ${orderNumber}

      </p>

      <p>

      Our team will review your request and
      notify you once it has been approved.

      </p>
    `,
  });
};

export default sampleRequestReceivedTemplate;