import masterLayout from "../layouts/masterLayout.js";

const passwordChangedTemplate = ({ name }) => {
  return masterLayout({
    title: "Password Changed",

    heading: "Password Updated Successfully",

    greeting: `Hello ${name},`,

    content: `
      <p>

        This email confirms that your
        <strong>His Masterpiece</strong>
        account password has been changed successfully.

      </p>

      <p>

        If you made this change,
        no further action is required.

      </p>

      <p>

        If you did NOT change your password,
        please contact our support team immediately.

      </p>

      <div
        style="
          margin-top:35px;
          padding:20px;
          background:#FFF7E7;
          border-left:4px solid #B68C2F;
        "
      >

      <strong>

      Security Tip

      </strong>

      <br><br>

      Never share your password or OTP with anyone.

      </div>
    `,
  });
};

export default passwordChangedTemplate;