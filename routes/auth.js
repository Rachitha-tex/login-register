const express=require('express');
const router=express.Router();
const bcrypt=require("bcryptjs");

const userModel=require("../models/User");
const {registerValidation}=require("../validation");
const {loginValidation}=require("../validation");


//Validation

router.post('/register',async (req,res)=>{
    //Validate data
 const {error}=registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message);

//check if user already in db
const emailExist=await userModel.findOne({email:req.body.email})
if(emailExist) return res.status(400).send("Email already exist");

//hash password

const salt=await bcrypt.genSalt(10);
const hashPassword=await bcrypt.hash(req.body.password,salt);

  //create a new user
    const user=new userModel({
       name:req.body.name,
       email:req.body.email,
       password:hashPassword
    })
    try {
        const saveUser=await user.save();
        res.send({user:user._id});
    } catch (error) {
        res.status(400).send(error);
    }
})


//LOGIN

router.post('/login',async (req,res)=>{
        //Validate data
 const {error}=loginValidation(req.body)
 if(error) return res.status(400).send(error.details[0].message);

 //check if user email already in db
const user=await userModel.findOne({email:req.body.email})
if(!user) return res.status(400).send("Email or password is not exist");

//If password is correct
const validPass= await bcrypt.compare(req.body.password,user.password);
if(!validPass) return res.status(400).send("Password is not exist");
res.send("Logged In");
})


module.exports=router;