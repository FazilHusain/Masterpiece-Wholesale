import WholesaleInquiry from "../models/WholesaleInquiry.js";

const generateWholesaleInquiryNumber = async () => {
  const year = new Date().getFullYear();

  const prefix = `WH-${year}`;

  const lastInquiry = await WholesaleInquiry.findOne({
    inquiryNumber: {
      $regex: `^${prefix}`,
    },
  })
    .sort({
      createdAt: -1,
    })
    .select("inquiryNumber");

  let nextNumber = 1;

  if (lastInquiry?.inquiryNumber) {
    const parts =
      lastInquiry.inquiryNumber.split("-");

    nextNumber = Number(parts[2]) + 1;
  }

  return `${prefix}-${String(
    nextNumber,
  ).padStart(5, "0")}`;
};

export default generateWholesaleInquiryNumber;