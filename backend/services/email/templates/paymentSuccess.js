import masterLayout from "../layouts/masterLayout.js";

const paymentSuccessTemplate = ({
  name,
  orderNumber,
  amount,
}) => {
  return masterLayout({
    title: "Payment Successful",

    heading: "Payment Received",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Thank you for your payment.

      </p>

      <table width="100%" cellpadding="10">

      <tr>
      <td><strong>Order Number</strong></td>
      <td>${orderNumber}</td>
      </tr>

      <tr>
      <td><strong>Amount Paid</strong></td>
      <td>$${amount}</td>
      </tr>

      </table>

      <p>

      We've received your payment successfully.

      </p>
    `,
  });
};

export default paymentSuccessTemplate;