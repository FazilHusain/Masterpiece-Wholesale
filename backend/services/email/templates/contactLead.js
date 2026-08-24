import masterLayout from "../layouts/masterLayout.js";

const contactLeadTemplate = (data) => {
  return masterLayout({
    heading: "New Contact Enquiry",

    content: `
      <table
        style="
          width:100%;
          border-collapse:collapse;
        "
      >

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
        <td><strong>Country</strong></td>
        <td>${data.country}</td>
      </tr>

      <tr>
        <td><strong>Subject</strong></td>
        <td>${data.subject}</td>
      </tr>

      </table>

      <br>

      <strong>Message</strong>

      <p>
        ${data.message}
      </p>
    `,
  });
};

export default contactLeadTemplate;