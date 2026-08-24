import ApiResponse from "../../utils/ApiResponse.js";

const getTradeProfile = async (req, res, next) => {
  try {
    return res.status(200).json(
      new ApiResponse(
        200,
        req.user,
        "Trade profile fetched successfully."
      )
    );
  } catch (error) {
    next(error);
  }
};

export default getTradeProfile;