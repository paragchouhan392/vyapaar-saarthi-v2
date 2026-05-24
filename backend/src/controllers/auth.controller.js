const businessModel = require('../models/business.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerBusiness(req, res){
  try {
    const {businessName, email, password, businessType, businessDescription} = req.body;

    //check if business with the same email already exists 
    const existingBusiness = await businessModel.findOne({email});
    if(existingBusiness){
      return res.status(400).json({
        message: "business with this email already exists"
      })
    }

    //hash the password
    const hash = await bcrypt.hash(password, 10);

    //create new business
    const business = await businessModel.create({
      businessName,
      email,
      password: hash,
      businessType,
      businessDescription
    })

    const token = jwt.sign({
      id: business._id,
      businessType: business.businessType
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
      message: "business registered successfully",
      business: {
        id: business._id,
        businessName: business.businessName,
        email: business.email,
        businessType: business.businessType,
        businessDescription: business.businessDescription
      }
    })
  }
  catch(error){
    res.status(500).json({
      message: "error registering business",
      error: error.message
    })
  }
}

async function loginBusiness(req, res){
  try {
    const { email, password } = req.body;

    const business = await businessModel.findOne({ email });

    if(!business){
      return res.status(400).json({
        message: "invalid credentials"
      });
    }

    const validPassword = await bcrypt.compare(password, business.password);
    if(!validPassword){
      return res.status(400).json({
        message: "invalid credentials"
      });
    }

    const token = jwt.sign({
      id: business._id,
      businessType: business.businessType
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    return res.status(200).json({
      message: "business logged in successfully",
      business: {
        id: business._id,
        businessName: business.businessName,
        email: business.email,
        businessType: business.businessType,
        businessDescription: business.businessDescription
      }
    });
  }
  catch(error){
    res.status(500).json({
      message: "error logging in business",
      error: error.message
    });
  }
}

module.exports = {
  registerBusiness,
  loginBusiness
}