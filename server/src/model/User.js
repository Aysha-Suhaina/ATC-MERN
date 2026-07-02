import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    // name: {type: String , required:true },
    // email: {type: String , required:true, unique:true },
    // password: {type: String , required:true},
    // resetOtp :{type: String , default: ''},
    // resetOtpExpireAt :{type: Number , default: 0}

    name: String,
    email: {type: String,unique: true, required: true},
    password:{type: String , required:true},

    resetOtp :{type: String , default: ''},
    resetOtpExpireAt :{type: Number , default: 0},
    
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },
    profileImage: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    },

    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation"
    },
    isActive: {type: Boolean,default: true},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);