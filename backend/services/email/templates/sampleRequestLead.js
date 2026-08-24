import masterLayout from "../layouts/masterLayout.js";

const sampleRequestLeadTemplate = (data) => {
  return masterLayout({
    title: "New Sample Request",

    heading: "New Sample Request",

    content: `
      <table width="100%" cellpadding="10" cellspacing="0">

        <tr>
          <td><strong>Order No</strong></td>
          <td>${data.orderNumber}</td>
        </tr>

        <tr>
          <td><strong>Customer</strong></td>
          <td>${data.name}</td>
        </tr>

        <tr>
          <td><strong>Email</strong></td>
          <td>${data.email}</td>
        </tr>

        <tr>
          <td><strong>Phone</strong></td>
          <td>${data.phone}</td>
        </tr>

        <tr>
          <td><strong>Product</strong></td>
          <td>${data.productName}</td>
        </tr>

        <tr>
          <td><strong>Quantity</strong></td>
          <td>${data.quantity}</td>
        </tr>

      </table>
    `,
  });
};

export default sampleRequestLeadTemplate;