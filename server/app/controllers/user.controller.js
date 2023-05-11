const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NODENGRXAPI"

// Create and Save a new Tutorial
exports.signUp = async (req, res) => {
  // Validate request
  const {email, password, name} = req.body;
  try {
    if (!req.body) {
      return res.status(400).json({message: 'Credentials required'})
    }
    const existingUser = await User.findOne({email: email});
    if (existingUser) {
      return res.status(400).json({message: 'User already exist.'})
    }
    const hashPassowrd = await bcrypt.hash(password, 10);
    const result = User.create({
      name: name,
      email: email,
      password: hashPassowrd,
    });
    const token = jwt.sign({email: email, id:result._id }, SECRET_KEY);
    res.status(201).json({user: result, token: token});
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Something went wrong!'});
  }
};

exports.signIn = async (req, res) => {
  // Validate request
  const {email, password} = req.body;
  try {
    const existingUser = await User.findOne({email: email});
    if (!existingUser) {
      return res.status(400).json({message: 'User not found.'})
    }
    const matchPassowrd = await bcrypt.compare(password, existingUser.password);
    if (!matchPassowrd) {
      return res.status(400).json({message: 'Invalid Password.'})
    }

    const token = jwt.sign({email: existingUser.email, id:existingUser._id }, SECRET_KEY);
    res.status(201).json({user: existingUser, token: token});
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Something went wrong!'});
  }
};

exports.logout = async (req, res) => {
  try {
    // res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.list = async (req, res) => {
  // Validate request
  try {
    const result = [{
      "id":"6451f627632a2c64e0ef224f",
      "name": "Raj Doe",
      "email": "rajdoe@mailinator.com",
    },{
      "id":"6451f789e3720888f7e32759",
      "name": "Raj Doe1",
      "email": "rajdoe1@mailinator.com",
    }];
    res.status(201).json({users: result});
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Something went wrong!'});
  }
};