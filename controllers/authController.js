const register = (req, res) => {
  res.send("regiseration completed");
};

const login = (req, res) => {
  res.send("login completed");
};

module.exports = {
  register,
  login,
};
