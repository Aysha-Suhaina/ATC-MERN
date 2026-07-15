import bcrypt from "bcryptjs";
import User from "../model/User.js";
import Department from "../model/Department.js";
import ApiResponse from "../utils/ApiResponse.js";
import Designation from "../model/Designation.js";
export const getProfile = async (
  req,
  res,
  next
) => {
  try {
    const user = await User.findById(
      req.user.id
    )
    .populate("department")
    .populate("designation")
    .select("-password");

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
        ).populate("department")
        .populate("designation")
        .select("-password");

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

    const {
      search,
      department,
      designation,
      active,
    } = req.query;

    const filter = {
      role: "employee",
    };

    if (department) {
      filter.department =
        department;
    }

    if (designation) {
      filter.designation =
        designation;
    }

    if (
      active !== undefined &&
      active !== ""
    ) {
      filter.isActive =
        active === "true";
    }

    if (search) {

      filter.$or = [

        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

      ];

    }

    const employees =
      await User.find(filter)
        .populate({
          path: "department",
          populate: {
            path: "manager",
            select:
              "name email",
          },
        })
        .populate("designation")
        .select("-password");

    res.status(200).json({
      success: true,
      employees,
    });

  } catch (error) {
    next(error);
  }
};

export const getAllAttendance =
  async (req, res, next) => {
    try {
      const records =
        await Attendance.find()
          .populate("employeeId")
          .populate("department")
          .populate("designation")
          .sort({ date: -1 });

      res.status(200).json({
        success: true,
        records,
      });
    } catch (error) {
      next(error);
    }
  };

  export const deleteAttendance =
  async (req, res, next) => {
    try {
      await Attendance.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
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
      ).populate("department")
  .select("-password");

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

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingEmployee = await User.findOne({ email });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      department,
      designation,
      
    });

    const employeeResponse = employee.toObject();
    delete employeeResponse.password;

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: employeeResponse,
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
    const {
  name,
  email,
  department,
  designation,
  
} = req.body;

const employee =
  await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      department,
      designation,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("department")
    .populate("designation")

    .select("-password");

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

export const reactivateEmployee = async (req, res, next) => {
  try {
    const employee = await User.findByIdAndUpdate(
      req.params.id,
      {
        isActive: true,
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

  // export const addDepartment = async (req,res,next)=>{

    
  // }

  export const getManagers = async (req, res, next) => {
  try {
    const managers = await User.find({
      role: "manager",
      isActive: true,
    }).select("name email");

    res.status(200).json({
      success: true,
      managers,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyDepartmentEmployees = async (
  req,
  res,
  next
) => {
  try {
    const department = await Department.findOne({
      manager: req.user.id,
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "No department assigned.",
      });
    }

    const employees = await User.find({
      role: "employee",
      department: department._id,
      isActive: true,
    })
      .populate("department")
      .populate("designation")
      .select("-password");

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    next(error);
  }
};
export const assignDesignationByManager =
  async (req, res) => {
    try {
      const { designationId } = req.body;

      const department =
        await Department.findOne({
          manager: req.user._id,
        });

      if (!department) {
        return res.status(404).json({
          success: false,
          message:
            "You are not managing any department.",
        });
      }

      const employee =
        await User.findById(
          req.params.employeeId
        );

      if (!employee) {
        return res.status(404).json({
          success: false,
          message:
            "Employee not found.",
        });
      }

      if (
        employee.department.toString() !==
        department._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Employee does not belong to your department.",
        });
      }

      const designation =
        await Designation.findOne({
          _id: designationId,
          department: department._id,
        });

      if (!designation) {
        return res.status(404).json({
          success: false,
          message:
            "Designation not found in your department.",
        });
      }

      employee.designation =
        designation._id;

      await employee.save();

      res.json({
        success: true,
        message:
          "Designation updated successfully.",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // chat controllers

export const getChatUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
      isActive: true,
    })
      .select(
        "name role department designation"
      )
      .populate("department", "name")
      .sort({ name: 1 });

    res.json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};



