const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { Op } = require("sequelize");

const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    const err = new Error("JWT_SECRET belum diset di environment");
    err.status = 500;
    throw err;
  }

  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
};

const register = async (req, res, next) => {
  try {
    const { name, username, email, password, phoneNumber, address } = req.body;

    const user = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User sudah terdaftar",
      });
    }

    const newUser = await User.create({
      name,
      username,
      email,
      password,
      phoneNumber,
      address,
    });
    return res.status(201).json({
      success: true,
      message: "Success creating new user",
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      phoneNumber: newUser.phoneNumber,
      address: newUser.address,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Salah email atau password",
      });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid)
      return res.status(401).json({
        success: false,
        message: "Salah email atau password",
      });

    const token = signToken(user);
    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      accessToken: token,
      name: user.name,
      role: user.role,
      id: user.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };
