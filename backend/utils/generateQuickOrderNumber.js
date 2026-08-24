import QuickOrder from "../models/QuickOrder.js";

const generateQuickOrderNumber = async () => {
  const count = await QuickOrder.countDocuments();

  const nextNumber = String(count + 1).padStart(6, "0");

  return `HM-QO-${nextNumber}`;
};

export default generateQuickOrderNumber;