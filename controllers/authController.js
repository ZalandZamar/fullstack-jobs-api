const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.create({ name, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "email and password required" });
    return;
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "user not found" });
    return;
  }
  const pwd = await user.comparePassword(password);
  if (!pwd) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "not authorized" });
    return;
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
