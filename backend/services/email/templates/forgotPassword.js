import masterLayout from "../layouts/masterLayout.js";

const forgotPasswordTemplate = ({ name, otp }) => {
  return masterLayout({
    title: "Reset Password",
    heading: "Reset Your Password",
    greeting: `Hello ${name},`,

    content: `
      <p>
        We received a request to reset your password for your
        <strong>His Masterpiece</strong> account.
      </p>

      <p>
        Please use the following One-Time Password (OTP)
        to continue.
      </p>

      <div
        style="
          margin:40px 0;
          text-align:center;
        "
      >

        <div
          style="
            display:inline-block;
            background:#F7F3EB;
            border:1px solid #E7DED1;
            padding:22px 45px;
            font-size:34px;
            letter-spacing:12px;
            font-weight:bold;
            color:#183425;
          "
        >

          ${otp}

        </div>

      </div>

      <p>

        This OTP will expire in
        <strong>10 minutes</strong>.

      </p>

      <p>

        If you didn't request this,
        please ignore this email.

      </p>
    `,
  });
};

export default forgotPasswordTemplate;