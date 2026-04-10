const users = require('../models/users');
const User=require('../models/users');


const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
        return res.status(400).json({ message: "Email and password are required" });
    }
 const existingUser=users.findOne({email}); 
  if(existingUser){
    return res.status(400).json({ message: "User already exists" });
  }  
 const user=await User.create({email,password});
    

    res.json({ message: "User registered successfully" });
};

const loginUser = async (req, res) => {
    const {email,password}=req.body;    
    if (!email?.trim() || !password?.trim()) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user=User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"})
    }    
    if(user.password!=password){
        return res.status(400).json({ message: "Invalid password" });
    }
    res.json({ message: "Login successful" });
}

module.exports = { registerUser,loginUser };