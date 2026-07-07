import  Department from "../model/Department.js";
import User from "../model/User.js";

export const createDepartment = async (
  req,
  res,
  next
) => {
  try {
    const { name, description } = req.body;

    const existing =
      await Department.findOne({
        name,
      });

    if (existing) {
      return res.status(400).json({
        success: false,
        message:
          "Department already exists",
      });
    }

    const department =
      await Department.create({
        name,
        description,
      });

    return res.status(201).json({
      success: true,
      department,
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (
  req,
  res,
  next
) => {
  try {
    const departments =
      await Department.find()
        .populate(
          "manager",
          "name email"
        )
        .sort({
          name: 1,
        });

    return res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById =
  async (req, res, next) => {
    try {
      const department =
        await Department.findById(
          req.params.id
        ).populate(
          "manager",
          "name email"
        );

      if (!department) {
        return res.status(404).json({
          success: false,
          message:
            "Department not found",
        });
      }

      return res.status(200).json({
        success: true,
        department,
      });
    } catch (error) {
      next(error);
    }
  };

export const getMyDepartment = async (
  req,
  res,
  next
) => {
  try {
    const department =
      await Department.findOne({
        manager: req.user._id,
      }).populate(
        "manager",
        "name email"
      );

    if (!department) {
      return res.status(404).json({
        success: false,
        message:
          "You are not managing any department.",
      });
    }

    return res.status(200).json({
      success: true,
      department,
    });

  } catch (error) {
    next(error);
  }
};

export const updateMyDepartment = async (
  req,
  res,
  next
) => {
  try {
    const { description } = req.body;

    const department = await Department.findOne({
      manager: req.user._id
    }).populate("manager", "name email");

    if (!user.department) {
      return res.status(404).json({
        success: false,
        message: "You are not assigned to any department.",
      });
    }


    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    department.description = description;

    await department.save();

    await department.populate(
      "manager",
      "name email"
    );

    return res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      department,
    });

  } catch (error) {
    next(error);
  }
};

export const updateDepartment =
  async (req, res, next) => {
    try {
      const {
        name,
        description,
      } = req.body;

      const department =
        await Department.findByIdAndUpdate(
          req.params.id,
          {
            name,
            description,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!department) {
        return res.status(404).json({
          success: false,
          message:
            "Department not found",
        });
      }

      return res.status(200).json({
        success: true,
        department,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteDepartment =
  async (req, res, next) => {
    try {
      const department =
        await Department.findById(
          req.params.id
        );

      if (!department) {
        return res.status(404).json({
          success: false,
          message:
            "Department not found",
        });
      }

      await department.deleteOne();

      return res.status(200).json({
        success: true,
        message:
          "Department deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

export const assignManager = async (
  req,
  res,
  next
) => {
  try {
    const { employeeId } = req.body;

    const employee = await User.findById(employeeId);
    if (
      employee.department?.toString() !==
      req.params.id
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Employee does not belong to this department.",
      });
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (!employee.isActive) {
      return res.status(400).json({
        success: false,
        message: "Inactive employees cannot be assigned as managers.",
      });
    }

    if (employee.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admins cannot be assigned as department managers.",
      });
    }

    const department = await Department.findById(req.params.id)
      .populate("manager", "name");

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    // Department already has a manager
    if (department.manager) {
      return res.status(400).json({
        success: false,
        message: `${department.name} is already managed by ${department.manager.name}. Please depromote the current manager first.`,
      });
    }

    // Employee already manages another department
    const existingDepartment = await Department.findOne({
      manager: employee._id,
    });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: `${employee.name} already manages ${existingDepartment.name}.`,
      });
    }
   // Promote employee if needed
      if (employee.role === "employee") {
        employee.role = "manager";
      }

      // Make sure the manager belongs to this department
      employee.department = department._id;

      await employee.save();

      department.manager = employee._id;
      await department.save();
    await department.populate("manager", "name email");

    return res.status(200).json({
      success: true,
      message: `${employee.name} has been assigned as manager of ${department.name}.`,
      department,
    });

  } catch (error) {
    next(error);
  }
};

export const getDepartmentEmployees =
  async (req, res, next) => {
    try {
      const employees =
        await User.find({
          department: req.params.id,
          role: "employee",
        })
          .select(
            "name email isActive"
          )
          .sort({
            name: 1,
          });

      return res.status(200).json({
        success: true,
        employees,
      });
    } catch (error) {
      next(error);
    }
  };

export const changeManager = async (
  req,
  res,
  next
) => {
  try {
    const { employeeId } = req.body;

    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    if (!department.manager) {
      return res.status(400).json({
        success: false,
        message: "No manager assigned to this department.",
      });
    }

    const currentManager = await User.findById(
      department.manager
    );

    const newManager = await User.findById(
      employeeId
    );

    if (!newManager) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    if (
      newManager.department?.toString() !==
      department._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Employee does not belong to this department.",
      });
    }

    if (!newManager.isActive) {
      return res.status(400).json({
        success: false,
        message:
          "Inactive employee cannot become manager.",
      });
    }

    currentManager.role = "employee";
    newManager.role = "manager";

    department.manager = newManager._id;

    await currentManager.save();
    await newManager.save();
    await department.save();

    return res.status(200).json({
      success: true,
      message: "Manager changed successfully.",
    });

  } catch (error) {
    next(error);
  }
};

export const removeManager = async (
  req,
  res,
  next
) => {
  try {
    const department =
      await Department.findById(
        req.params.id
      );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    if (!department.manager) {
      return res.status(400).json({
        success: false,
        message: "No manager assigned.",
      });
    }

    const manager =
      await User.findById(
        department.manager
      );

    manager.role = "employee";

    department.manager = null;

    await manager.save();
    await department.save();

    return res.status(200).json({
      success: true,
      message: "Manager removed successfully.",
    });

  } catch (error) {
    next(error);
  }
};