import Admin from "../../models/Admin.js";

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old Password and New Password are required.",
      });
    }

    const admin = await Admin.findById(req.user._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const isMatched = await admin.matchPassword(oldPassword);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect.",
      });
    }

    admin.password = newPassword;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default changePassword;