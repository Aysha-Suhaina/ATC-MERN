import Designation from "../model/Designation.js";

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
        msg: "Designation already exists in this department",
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
      msg: error.message,
    });
  }
};

// Get All
export const getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find()
      .populate("department")
      .sort({ name: 1 });

    res.json({
      success: true,
      designations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
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
        msg: "Designation not found",
      });
    }

    res.json({
      success: true,
      designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
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
      msg: error.message,
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
        msg: "Designation not found",
      });
    }

    res.json({
      success: true,
      designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
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
        msg: "Designation not found",
      });
    }

    res.json({
      success: true,
      msg: "Designation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

