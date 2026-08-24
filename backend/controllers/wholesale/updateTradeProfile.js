import User from "../../models/User.js";

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const updateTradeProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ApiError(404, "Trade user not found."));
    }

    const {
      firstName,
      lastName,
      phone,
      businessName,
      website,
      businessType,
      taxId,
      country,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      profileImage,
    } = req.body;

    if (firstName !== undefined) user.firstName = firstName.trim();
    if (lastName !== undefined) user.lastName = lastName.trim();
    if (phone !== undefined) user.phone = phone.trim();

    if (businessName !== undefined)
      user.businessName = businessName.trim();

    if (website !== undefined) user.website = website.trim();

    if (businessType !== undefined)
      user.businessType = businessType.trim();

    if (taxId !== undefined) user.taxId = taxId.trim();

    if (country !== undefined) user.country = country.trim();

    if (addressLine1 !== undefined)
      user.addressLine1 = addressLine1.trim();

    if (addressLine2 !== undefined)
      user.addressLine2 = addressLine2.trim();

    if (city !== undefined) user.city = city.trim();

    if (state !== undefined) user.state = state.trim();

    if (postalCode !== undefined)
      user.postalCode = postalCode.trim();

    if (profileImage !== undefined)
      user.profileImage = profileImage.trim();

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    return res.status(200).json(
      new ApiResponse(
        200,
        updatedUser,
        "Trade profile updated successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default updateTradeProfile;