const profile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export default profile;