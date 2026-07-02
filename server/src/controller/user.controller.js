import bcrypt from "bcryptjs";
import User from "../model/User.js";
import Department from "../model/Department.js";
import ApiResponse from "../utils/ApiResponse.js";

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
    const employees = await User.find({
      role: "employee",
    }).populate({
  path: "department",
  populate: {
    path: "manager",
    select: "name email",
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

export const promoteToManager = async (
  req,
  res,
  next
) => {
  try {
    const employee =
      await User.findById(
        req.params.id
      );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (employee.role === "admin") {
      return res.status(400).json({
        success: false,
        message:
          "Admin cannot be promoted",
      });
    }

    if (employee.role === "manager") {
      return res.status(400).json({
        success: false,
        message:
          "User is already a manager",
      });
    }
    if (!employee.isActive) {
      return res.status(400).json({
        success: false,
        message:
          "Inactive employees cannot be promoted.",
      });
    }

    employee.role = "manager";

    await employee.save();

    res.status(200).json({
      success: true,
      message:
        "Employee promoted to manager",
      employee,
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