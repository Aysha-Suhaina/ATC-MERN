import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import transporter from '../config/nodemailer.js';

export const register = async(req,res)=>{
    const{name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({success:false , msg:"enter all the credentials"})
    }

    try{
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.json({success:false , msg:"mail already exist - please try with another mail "})
        }

        const hashedPassword= await bcrypt.hash(password,10);
        const user = new User({name,email,password:hashedPassword, role:"employee"});

        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn:'7d'});

        //welcome mil
        res.status(201).cookie('token', token, {
            httpOnly:true,
            //SECURE
            //sameSite
            maxAge:7*24*60*60*1000
        }).json({ success: true, msg: "Registered successfully" });

        const mailOptions ={
        from: process.env.SENDER_MAIL,
        to: email,
        subject: `Welcome to our platform ${name}`,
        text: `Thank you for registering with us ${name}  . Your accound has been created with the email id ${email}.
        We are excited to have you on board`
    }

       // const info = await transporter.sendMail(mailOptions);

    }catch(err){
        return res.status(400).json({success:false,msg:err.message})
    }
}

export const login = async(req,res)=>{
    const {email,password}= req.body;

    if(!email || !password){
        return res.status(400).json({success:false, msg:"email and password are required "})
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.json({success:false,msg:"User not registered"})
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message:
                "Account has been deactivated",
            });
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,msg:"Invalid password"})
        };
        const userRole = user.role?.toLowerCase();

        const token = jwt.sign({id: user._id,role: userRole},
             process.env.JWT_SECRET,
             {expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        });
        return res.json({
            success: true,
            userId: user._id,
            name: user.name,
            userRole,
            msg: "Login successful"
        });
//message 


    }catch(err){
        return res.json({success:false,msg:err.message})
    }
}

export const logout= async(req,res)=>{

    try{
        res.clearCookie('token', {httpOnly:true})

        return res.json({success:true,msg:"logged out"})
    }catch(err){
        return res.json({success:false,msg:err.message})
    }
}

export const sendResetOtp = async (req,res)=>{
    const {email}= req.body;

    if(!email){
        return res.status(400).json({success:false,msg:"email required"})
    }
    try{
        const user = await User.findOne({email
        });

        if(!user){
            return res.status(404).json({success:false,msg:"email not found"})
        }

        const otp= String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp=otp;
        user.resetOtpExpiresAt= Date.now() + 10*60*1000;

        await user.save();
        // console.log(" before sending mail ")
        const mailOptions ={
        from: process.env.SENDER_MAIL,
        to: email,
        subject: "Password Reset OTP",
        text: `your OTP for resetting your password is ${otp}. The OTP is valid for 10 minutes, 
        please use it to reset your password.`
        }

         const info = await transporter.sendMail(mailOptions);
        console.log("mail sent:", info);
        return res.status(200).json({success:true,msg:"OTP sent to your email"})

    }catch(err){
        return res.status(400).json({success:false,msg:err.message})
    }
}

//reseting the password

export const resetPassword= async(req,res)=>{

    const {email,otp,newPassword}= req.body;

    if(!email || !otp || !newPassword){
        return res.status(400).json({success:false,msg:"enter all the credentials"})
    }
    try{
       const user=await User.findOne({email});

       if(!user){
        return res.status(400).json({success:false,msg:"email not found"})  

       }
       if(user.resetOtp !==otp || user.resetOtp=== "" || user.resetOtpExpiresAt < Date.now()){
        return res.status(400).json({success:false,msg:"invalid or expired OTP"})
       }

       const hashedPassword= await bcrypt.hash(newPassword,10);

       user.password=hashedPassword;
       user.resetOtp="";
       user.resetOtpExpiresAt=0;

       await user.save();

       return res.status(200).json({success:true,msg:"password reset successful"})
    }catch(err){
        return res.status(400).json({success:false,msg:err.message})
    };
    
}
