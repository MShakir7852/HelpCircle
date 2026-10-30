<<<<<<< HEAD

require("dotenv").config();
const {requestRoutes}=require('../backend/routes/requestRoutes')
const express = require("express");
const connectDb = require("./config/connectDb");

const app = express();

app.use(express.json());

app.use('/api/requests', requestRoutes);
const startServer = async () => {
  await connectDb();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
=======
require('dotenv').config();
const express=require('express');const cors=require('cors');const helmet=require('helmet');const rateLimit=require('express-rate-limit');const connectDb=require('./config/connectDb');
const app=express();
app.use(helmet());app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173',credentials:true}));app.use(express.json({limit:'1mb'}));
app.use('/api/auth',rateLimit({windowMs:15*60*1000,max:100,standardHeaders:true,legacyHeaders:false}),require('./routes/authRoutes'));
app.use('/api/requests',require('./routes/requestRoutes'));
app.get('/api/health',(_req,res)=>res.json({success:true,message:'HelpCircle API is healthy',timestamp:new Date().toISOString()}));
app.use((req,res)=>res.status(404).json({success:false,message:'API route not found.'}));
app.use((err,_req,res,_next)=>{console.error(err);if(err.name==='ValidationError')return res.status(400).json({success:false,message:Object.values(err.errors).map(x=>x.message).join(', ')});if(err.code===11000)return res.status(409).json({success:false,message:'This record already exists.'});res.status(err.status||500).json({success:false,message:process.env.NODE_ENV==='production'?'Something went wrong.':err.message||'Internal server error.'})});
const start=async()=>{try{await connectDb();const port=process.env.PORT||3000;app.listen(port,()=>console.log(`HelpCircle API running on http://localhost:${port}`))}catch(e){console.error('Startup failed:',e.message);process.exit(1)}};
if(require.main===module)start();module.exports=app;
>>>>>>> e015e11 (first commit)
