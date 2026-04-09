const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// @desc  Login admin
// @route POST /api/auth/login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide email and password.' });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });

  if (!admin || !(await admin.comparePassword(password))) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid credentials.' });
  }

  res.json({
    success: true,
    token: generateToken(admin._id),
    admin: { id: admin._id, email: admin.email },
  });
};

module.exports = { loginAdmin };
