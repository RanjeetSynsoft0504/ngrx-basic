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
      res.status(400).json({message: 'Credentials required'})
    }
    const existingUser = await User.findOne({email: email});
    if (existingUser) {
      res.status(400).json({message: 'User already exist.'})
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
      res.status(400).json({message: 'User not found.'})
    }
    const matchPassowrd = await bcrypt.compare(password, existingUser.password);
    if (!matchPassowrd) {
      res.status(400).json({message: 'Invalid Password.'})
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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    console.log(req.query, '------------------------');
    const users = await User.find().skip(startIndex).limit(limit);
    const count = await User.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const currentPage = page > totalPages ? totalPages : page;
    const pagination = { currentPage, totalPages };
    res.status(200).json({users, pagination});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.add = async (req, res) => {
//   // Validate request
//   const {email, password, name} = req.body;
//   try {
//     if (!req.body) {
//       res.status(400).json({message: 'Credentials required'})
//     }
//     const existingUser = await User.findOne({email: email});
//     if (existingUser) {
//       res.status(400).json({message: 'User already exist.'})
//     }
//     const hashPassowrd = await bcrypt.hash(password, 10);
//     const result = User.create({
//       name: name,
//       email: email,
//       password: hashPassowrd,
//     });
//     const token = jwt.sign({email: email, id:result._id }, SECRET_KEY);
//     res.status(201).json({user: result, token: token});
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({message: 'Something went wrong!'});
//   }
// };

exports.add = async (req, res) => {
  // Validate request
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email, id: result._id }, SECRET_KEY);
    return res.status(201).json({ user: result, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

