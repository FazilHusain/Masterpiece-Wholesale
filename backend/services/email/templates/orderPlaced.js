import masterLayout from "../layouts/masterLayout.js";

const orderPlacedTemplate = ({
  name,
  orderNumber,
}) => {
  return masterLayout({
    title: "Order Placed",

    heading: "Order Received",

    greeting: `Hello ${name},`,

    content: `
      <p>

      Thank you for shopping with
      His Masterpiece.

      </p>

      <p>

      Your order has been placed successfully.

      </p>

      <p>

      <strong>Order Number</strong>

      <br>

      ${orderNumber}

      </p>

      <p>

      We'll notify you
      when your order moves to the next stage.

      </p>
    `,
  });
};

export default orderPlacedTemplate;