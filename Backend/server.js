const express = require('express');
const authRoutes = require('./routes/auth/auth');
const connectDB=require('./config/db');
connectDB();
const app=express();
app.use(express.json());
app.use('/auth', authRoutes);

 const PORT=process.env.PORT || 5000;
 app.get('/',(req,res)=>{
        res.send("Hello World");
 })

 app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
 })