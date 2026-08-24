import masterLayout from "../layouts/masterLayout.js";

const wholesaleLeadTemplate = (data) => {
  return masterLayout({
    title: "New Wholesale Application",

    heading: "New Wholesale Lead",

    content: `
      <table width="100%" cellpadding="10" cellspacing="0">

      <tr>

      <td><strong>Application No</strong></td>

      <td>${data.applicationNumber}</td>

      </tr>

      <tr>

      <td><strong>Business</strong></td>

      <td>${data.businessName}</td>

      </tr>

      <tr>

      <td><strong>Name</strong></td>

      <td>${data.firstName} ${data.lastName}</td>

      </tr>

      <tr>

      <td><strong>Email</strong></td>

      <td>${data.email}</td>

      </tr>

      <tr>

      <td><strong>Phone</strong></td>

      <td>${data.whatsapp}</td>

      </tr>

      <tr>

      <td><strong>Country</strong></td>

      <td>${data.country}</td>

      </tr>

      <tr>

      <td><strong>Business Type</strong></td>

      <td>${data.businessType}</td>

      </tr>

      </table>

      <br>

      <strong>Message</strong>

      <p>${data.message || "-"}</p>
    `,
  });
};

export default wholesaleLeadTemplate;