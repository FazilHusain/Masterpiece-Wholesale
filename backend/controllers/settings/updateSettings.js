import Setting from "../../models/Setting.js";

import ApiResponse from "../../utils/ApiResponse.js";

const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    Object.assign(settings, req.body);

    await settings.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        settings,
        "Settings updated successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default updateSettings;