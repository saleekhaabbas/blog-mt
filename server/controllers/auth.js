const User = require("../models/User");

// Get token from model, create cookie and send response
const sendTokenResponse = async (user, res) => {
  const { email, password, userType, _id } = user;
  const token = user.getSignedJwtToken();
  if (!token) {
    res.status(200).json({
      success: false,
      message: "Something went wrong!",
    });
  } else {
    res.status(200).json({
      user,
      token,
      success: true,
      message: "welcome back",
    });
  }
};

// @desc      Register customer from mobile
// @route     POST /api/v1/auth/register/customer
// @access    Public
exports.register = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;

    // Create user
    const user = await User.create({
      name,
      password,
      email,
    });

    res.status(200).json({
      success: true,
      user,
      message: "user created successfully",
    });
  } catch (err) {
    console.log("error check", err);
    res.status(204).json({
      success: false,
      message: err.toString(),
    });
  }
};

// @desc      GET CURRENT LOGGED UER
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = async (req, res) => {
  const admin = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    admin,
  });
};

// @desc      LOGIN USER
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkMail = await User.findOne({ email }).select("+password");
    if (!checkMail) {
      res.status(200).json({
        success: false,
        message: "There is no user corresponding to the email address.",
      });
    } else {
      const checkPassword = await checkMail.matchPassword(password);
      if (!checkPassword) {
        res.status(200).json({
          success: false,
          message: "Wrong password",
        });
      } else {
        sendTokenResponse(checkMail, res);
      }
    }
  } catch (err) {
    console.log("error check", err);
    res.status(204).json({
      success: false,
      message: err.toString(),
    });
  }
};
