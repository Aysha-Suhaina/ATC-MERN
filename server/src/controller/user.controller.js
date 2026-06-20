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

  //admin only controlers

  export const getAllEmployees = async (
  req,
  res,
  next
) => {
  try {
    const employees = await User.find({
      role: "employee",
    }).select("-password");

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById =
  async (req, res) => {
    const employee =
      await User.findById(
        req.params.id
      ).select("-password");

    res.status(200).json({
      success: true,
      employee,
    });
  };

export const createEmployee = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      email,
      password,
      department,
      designation,
    } = req.body;

    const employee =
      await User.create({
        name,
        email,
        password,
        role: "employee",
        department,
        designation,
      });

    res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (
  req,
  res,
  next
) => {
  try {
    const employee =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    next(error);
  }
};
export const deactivateEmployee =
  async (req, res, next) => {
    try {
      const employee =
        await User.findByIdAndUpdate(
          req.params.id,
          {
            isActive: false,
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        employee,
      });
    } catch (error) {
      next(error);
    }
  };
