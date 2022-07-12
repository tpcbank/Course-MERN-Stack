const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");

exports.login = (req, res) => {
  // ข้อมูล Username, Password
  const { username, password } = req.body;
  if (password === process.env.PASSWORD) {
    // login เข้าสู่ระบบ
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ token, username });
  } else {
    res.status(400).json({
      error: "รหัสผ่านไม่ถูกต้อง!",
    });
  }
};

exports.requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
