import crypto from "crypto";

const generateSecureToken = () => {
  const token = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return {
    token,
    hashedToken,
  };
};

export default generateSecureToken;