import crypto from "crypto";

const generateTempPassword = () => {
  return crypto.randomBytes(16).toString("hex");
};

export default generateTempPassword;