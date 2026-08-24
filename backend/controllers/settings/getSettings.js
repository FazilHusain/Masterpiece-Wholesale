import Setting from "../../models/Setting.js";

import ApiResponse from "../../utils/ApiResponse.js";

const getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        settings,
        "Settings fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getSettings;