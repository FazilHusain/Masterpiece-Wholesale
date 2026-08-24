const logout = async (req, res, next) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logout Successful.",
    });
  } catch (error) {
    next(error);
  }
};

export default logout;