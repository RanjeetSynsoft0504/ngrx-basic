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