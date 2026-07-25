import Designation from "../model/Designation.js";
import Department from "../model/Department.js";
import User from "../model/User.js";

// Create Designation
export const createDesignation = async (req, res) => {
  try {
    const { name, department } = req.body;

    const exists = await Designation.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
      department,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Designation already exists in this department",
      });
    }

    const designation = await Designation.create({
      name,
      department,
    });

    res.status(201).json({
      success: true,
      designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
export const getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find()
      .populate("department")
      .sort({ name: 1 });

    const data = await Promise.all(
      designations.map(async (designation) => {
        const employeeCount = await User.countDocuments({
  designation: designation._id,
  role: "employee",
});

//console.log(designation.name, employeeCount);
        return {
          ...designation.toObject(),
          employeeCount,
        };
      })
    );

    res.json({
      success: true,
      designations: data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By ID
export const getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findById(
      req.params.id
    ).populate("department");

    if (!designation) {
      return res.status(404).json({
        success: false,
        message: "Designation not found",
      });
    }

    res.json({
      success: true,
      designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Designations By Department
export const getDesignationsByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const designations = await Designation.find({
      department: departmentId,
    }).sort({ name: 1 });

    res.json({
      success: true,
      designations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
export const updateDesignation = async (req, res) => {
  try {
    const designation =
      await Designation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).populate("department");

    if (!designation) {
      return res.status(404).json({
        success: false,
        message: "Designation not found",
      });
    }

    res.json({
      success: true,
      designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getMyDepartmentDesignations =
  async (req, res) => {
    try {
      const department =
        await Department.findOne({
          manager: req.user._id,
        });

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "You are not managing any department.",
        });
      }

      const designations =
  await Designation.find({
    department: department._id,
  })
    .populate(
      "department",
      "name"
    )
    .sort({
      name: 1,
    });

const data = await Promise.all(
  designations.map(async (designation) => {
    const employeeCount =
  await User.countDocuments({
    designation: designation._id,
    role: "employee",
    isActive: true,
  });

    return {
      ...designation.toObject(),
      employeeCount,
    };
  })
);

res.json({
  success: true,
  designations: data,
});

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Delete
export const deleteDesignation = async (req, res) => {
  try {
    const designation =
      await Designation.findByIdAndDelete(
        req.params.id
      );

    if (!designation) {
      return res.status(404).json({
        success: false,
        message: "Designation not found",
      });
    }

    res.json({
      success: true,
      message: "Designation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createMyDepartmentDesignation = async (req, res) => {
    try {
      const { name } = req.body;

      const department =
        await Department.findOne({
          manager: req.user._id,
        });

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found.",
        });
      }

      const exists =
        await Designation.findOne({
          name: {
            $regex: `^${name}$`,
            $options: "i",
          },
          department: department._id,
        });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Designation already exists.",
        });
      }

      const designation =
        await Designation.create({
          name,
          department: department._id,
        });

      res.status(201).json({
        success: true,
        designation,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const updateMyDepartmentDesignation =
  async (req, res) => {
    try {
      const { name } = req.body;

      const department =
        await Department.findOne({
          manager: req.user._id,
        });

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "You are not managing any department.",
        });
      }

      const designation =
        await Designation.findById(
          req.params.id
        );

      if (!designation) {
        return res.status(404).json({
          success: false,
          message: "Designation not found.",
        });
      }

      if (
        designation.department.toString() !==
        department._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "You can edit only your department designations.",
        });
      }

      const exists =
        await Designation.findOne({
          _id: { $ne: designation._id },
          department: department._id,
          name: {
            $regex: `^${name}$`,
            $options: "i",
          },
        });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Designation already exists.",
        });
      }

      designation.name = name;

      await designation.save();

      await designation.populate(
        "department",
        "name"
      );

      res.json({
        success: true,
        designation,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const deleteMyDepartmentDesignation =
  async (req, res) => {
    try {
      const department =
        await Department.findOne({
          manager: req.user._id,
        });

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found.",
        });
      }

      const designation =
        await Designation.findOne({
          _id: req.params.id,
          department: department._id,
        });

      if (!designation) {
        return res.status(404).json({
          success: false,
          message: "Designation not found.",
        });
      }

      const employeeCount =
        await User.countDocuments({
          designation: designation._id,
        });

      if (employeeCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete. ${employeeCount} employee(s) are assigned to this designation.`,
        });
      }

      await designation.deleteOne();

      res.json({
        success: true,
        message: "Designation deleted successfully.",
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

