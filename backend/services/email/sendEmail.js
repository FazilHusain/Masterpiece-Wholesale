import transporter from "../../config/mailer.js";

const sendEmail = async ({
  to,
  subject,
  html,
  attachments = [],
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"His Masterpiece" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
      attachments,
    });

    return info;
  } catch (error) {
    console.error("Email Error :", error);
    throw error;
  }
};

export default sendEmail;