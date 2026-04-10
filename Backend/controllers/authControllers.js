
const User=require('../models/users');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const registerUser = async (req, res) => {
    const { name,email, password } = req.body;
console.log("BODY:", req.body);
   if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
}
 const existingUser=await User.findOne({email}); 
  if(existingUser){
    return res.status(400).json({ message: "User already exists" });

  } 
  
  const hashedPassword=await bcrypt.hash(password,10);
 const user=await User.create({
    name,
    email,
    password: hashedPassword});
    

    res.json({ message: "User registered successfully" });
};

const loginUser = async (req, res) => {
    const {email,password}=req.body;    
    if ( !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"})
    }    

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({ message: "Invalid password" });
    }
    //create token
    const token =jwt.sign({id:user._id},"anshu",{expiresIn:"1d"});
console.log(token);
    res.json({ message: "Login successful" ,token});
}

module.exports = { registerUser,loginUser };