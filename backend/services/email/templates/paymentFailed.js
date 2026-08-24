import masterLayout from "../layouts/masterLayout.js";

const paymentFailedTemplate = ({
  name,
  orderNumber,
}) => {
  return masterLayout({
    title: "Payment Failed",

    heading: "Payment Unsuccessful",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Unfortunately your payment
      could not be completed.

      </p>

      <p>

      Order Number :
      <strong>${orderNumber}</strong>

      </p>

      <p>

      Please try again.

      </p>
    `,
  });
};

export default paymentFailedTemplate;