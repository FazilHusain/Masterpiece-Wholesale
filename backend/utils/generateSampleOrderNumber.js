import SampleOrder from "../models/SampleOrder.js";

const generateSampleOrderNumber =
  async () => {
    const year =
      new Date().getFullYear();

    const total =
      await SampleOrder.countDocuments();

    const number = String(
      total + 1
    ).padStart(6, "0");

    return `SMP-${year}-${number}`;
  };

export default generateSampleOrderNumber;