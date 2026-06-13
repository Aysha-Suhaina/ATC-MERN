import User from "../model/User.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getProfile = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select("-password");

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile fetched",
        user
      )
    );
  } catch (error) {
    next(error);
  }
};

export const updateProfile =
  async (req, res, next) => {
    try {
      const {
        name,
        department,
        designation,
      } = req.body;

      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            name,
            department,
            designation,
          },
          {
            new: true,
          }
        ).select("-password");

      return res.status(200).json(
        new ApiResponse(
          200,
          "Profile updated",
          user
        )
      );
    } catch (error) {
      next(error);
    }
  };