import masterLayout from "../layouts/masterLayout.js";

const quoteLeadTemplate = (data) => {
  return masterLayout({
    title: "New Quote Request",

    heading: "New Quote Request",

    content: `
      <p>A customer has requested a quotation.</p>

      <table width="100%" cellpadding="10" cellspacing="0">

        <tr>
          <td><strong>Name</strong></td>
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

      <br>

      <strong>Message</strong>

      <p>${data.message || "-"}</p>
    `,
  });
};

export default quoteLeadTemplate;