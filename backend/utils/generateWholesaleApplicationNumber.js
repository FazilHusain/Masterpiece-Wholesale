import WholesaleApplication from "../models/WholesaleApplication.js";

const generateWholesaleApplicationNumber = async () => {
  const year = new Date().getFullYear();

  const totalApplications =
    await WholesaleApplication.countDocuments();

  const sequence = String(totalApplications + 1).padStart(6, "0");

  return `HM-${year}-${sequence}`;
};

export default generateWholesaleApplicationNumber;