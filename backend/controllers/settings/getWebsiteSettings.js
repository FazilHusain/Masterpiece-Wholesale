import Setting from "../../models/Setting.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getWebsiteSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne().select(
      "websiteName websiteTagline logo footerLogo favicon email phone whatsapp address googleMap facebook instagram linkedin youtube pinterest currency currencySymbol"
    );

    if (!settings) {
      settings = await Setting.create({});
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        settings,
        "Website settings fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getWebsiteSettings;