const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const { unauthenticatedError, badREquest } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.create({ name, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new badREquest("wrong credentials");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new unauthenticatedError("user can not be found");
  }
  const pwd = await user.comparePassword(password);
  if (!pwd) {
    throw new unauthenticatedError("wrong credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
