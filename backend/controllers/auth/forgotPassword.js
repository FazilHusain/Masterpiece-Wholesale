import crypto from "crypto";

import Admin from "../../models/Admin.js";
import sendEmail from "../../utils/sendEmail.js";

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // =========================
    // FIND ADMIN
    // =========================

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // =========================
    // ACTIVE CHECK
    // =========================

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is disabled.",
      });
    }

    // =========================
    // GENERATE OTP
    // =========================

    const otpCode = crypto.randomInt(100000, 1000000).toString();

    // OTP valid for 10 minutes

    const otpExpiresAt = new Date(
      Date.now() + 10 * 60 * 1000,
    );

    // =========================
    // SAVE OTP
    // =========================

    admin.otpCode = otpCode;
    admin.otpExpiresAt = otpExpiresAt;

    await admin.save();

    // =========================
    // SEND EMAIL
    // =========================

    await sendEmail({
      to: admin.email,

      subject: "His Masterpiece - Password Reset OTP",

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background: #f8f6f1;
              font-family: Arial, sans-serif;
              color: #12312b;
            "
          >

            <div
              style="
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border: 1px solid #e5ded4;
                border-radius: 16px;
                overflow: hidden;
              "
            >

              <div
                style="
                  background: #12312b;
                  padding: 28px;
                  text-align: center;
                "
              >
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 24px;
                    font-weight: 500;
                  "
                >
                  HIS MASTERPIECE
                </h1>

                <p
                  style="
                    margin: 8px 0 0;
                    color: #d8b26a;
                    font-size: 12px;
                    letter-spacing: 2px;
                  "
                >
                  ADMIN PANEL
                </p>
              </div>

              <div style="padding: 36px 30px;">

                <h2
                  style="
                    margin: 0 0 12px;
                    font-size: 24px;
                    font-weight: 600;
                  "
                >
                  Password Reset Request
                </h2>

                <p
                  style="
                    margin: 0;
                    color: #666666;
                    font-size: 14px;
                    line-height: 1.7;
                  "
                >
                  We received a request to reset your
                  His Masterpiece admin account password.
                  Use the OTP below to continue.
                </p>

                <div
                  style="
                    margin: 30px 0;
                    padding: 22px;
                    background: #faf8f4;
                    border: 1px dashed #d8b26a;
                    border-radius: 12px;
                    text-align: center;
                  "
                >

                  <p
                    style="
                      margin: 0 0 8px;
                      color: #777777;
                      font-size: 12px;
                      text-transform: uppercase;
                      letter-spacing: 2px;
                    "
                  >
                    Your OTP
                  </p>

                  <div
                    style="
                      font-size: 34px;
                      font-weight: 700;
                      letter-spacing: 8px;
                      color: #12312b;
                    "
                  >
                    ${otpCode}
                  </div>

                </div>

                <p
                  style="
                    margin: 0;
                    color: #666666;
                    font-size: 13px;
                    line-height: 1.7;
                  "
                >
                  This OTP is valid for
                  <strong>10 minutes</strong>.
                  Please do not share this code with anyone.
                </p>

                <div
                  style="
                    margin-top: 28px;
                    padding-top: 20px;
                    border-top: 1px solid #eeeeee;
                  "
                >

                  <p
                    style="
                      margin: 0;
                      color: #999999;
                      font-size: 12px;
                      line-height: 1.6;
                    "
                  >
                    If you did not request a password reset,
                    you can safely ignore this email.
                  </p>

                </div>

              </div>

              <div
                style="
                  padding: 20px 30px;
                  background: #faf8f4;
                  text-align: center;
                "
              >
                <p
                  style="
                    margin: 0;
                    color: #999999;
                    font-size: 11px;
                  "
                >
                  © ${new Date().getFullYear()}
                  His Masterpiece. All rights reserved.
                </p>
              </div>

            </div>

          </body>
        </html>
      `,
    });

    // =========================
    // RESPONSE
    // =========================

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default forgotPassword;