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

export const assignManager =
  async (req, res, next) => {
    try {
      const { managerId } =
        req.body;

      const manager =
        await User.findOne({
          _id: managerId,
          role: "manager",
          isActive: true,
        });

      if (!manager) {
        return res.status(404).json({
          success: false,
          message:
            "Manager not found or inactive",
        });
      }

      const existingDepartment =
        await Department.findOne({
          manager: managerId,
        });

      if (
        existingDepartment &&
        existingDepartment._id.toString() !==
          req.params.id
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Manager is already assigned to another department",
        });
      }

      const department =
        await Department.findByIdAndUpdate(
          req.params.id,
          {
            manager: managerId,
          },
          {
            new: true,
          }
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
        message:
          "Manager assigned successfully",
        department,
      });
    } catch (error) {
      next(error);
    }
  };