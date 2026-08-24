import masterLayout from "../layouts/masterLayout.js";

const tradeApprovedTemplate = ({
  name,
  email,
  temporaryPassword,
  loginUrl,
}) => {
  return masterLayout({
    title: "Trade Account Approved",

    heading: "Congratulations! 🎉",

    greeting: `Dear ${name},`,

    content: `
      <p>
        We are delighted to inform you that your
        <strong>His Masterpiece Trade Account</strong>
        has been approved.
      </p>

      <table
      width="100%"
      cellpadding="12"
      cellspacing="0"
      style="
      margin:35px 0;
      border-collapse:collapse;
      border:1px solid #ECE7DD;
      ">

      <tr>

      <td
      style="
      background:#FAF8F3;
      font-weight:bold;
      width:180px;
      ">

      Email

      </td>

      <td>

      ${email}

      </td>

      </tr>

      <tr>

      <td
      style="
      background:#FAF8F3;
      font-weight:bold;
      ">

      Temporary Password

      </td>

      <td>

      <strong>

      ${temporaryPassword}

      </strong>

      </td>

      </tr>

      </table>

      <p>

      For your account security,
      you'll be required to change your password
      immediately after logging in.

      </p>

      <p>

      Welcome to the
      His Masterpiece Trade Family.

      </p>
    `,

    buttonText: "Login Now",

    buttonUrl: loginUrl,
  });
};

export default tradeApprovedTemplate;