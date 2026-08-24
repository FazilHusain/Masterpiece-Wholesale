import sendEmail from "../../services/email/sendEmail";

const testMail = async (req, res) => {
  await sendEmail({
    to: "yourmail@gmail.com",
    subject: "His Masterpiece Test",
    html: "<h2>Email Service Working Successfully ✅</h2>",
  });

  res.json({
    success: true,
  });
};

export default testMail;