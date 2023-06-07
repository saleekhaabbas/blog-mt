const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");

//@desc   ADD BOOKING SLOTS
//@route  POST /api/blog
//@access public
exports.addBlog = async (req, res) => {
  try {
    console.log(req.body);
    const response = await Blog.create({ ...req.body, user: req.user._id });
    res.status(200).json({
      success: true,
      message: `successfully added booking slots ${response.bookingSlotsName}`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

//@desc GET ALL BOOKING SLOTS
//@route GET /api/v1/booking-slot
//@access public
exports.getBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      message: `updated specific booking slots`,
      blogs,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.toString(),
    });
  }
};

// @desc      UPDATE BOOKING SLOTS
// @route     PUT /api/v1/booking-slot
// @access    public
exports.updateBlog = async (req, res) => {
  try {
    const { blogID } = req.body;
    const response = await Blog.findByIdAndUpdate(blogID, req.body);
    res.status(200).json({
      success: true,
      message: `updated specific booking slots`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      DELETE BOOKING SLOTS
// @route     DELETE /api/v1/booking-slot
// @access    public
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await Blog.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: `deleted specific booking slot`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

//@desc GET ALL BOOKING SLOTS
//@route GET /api/v1/booking-slot
//@access public
exports.searchBlog = async (req, res) => {
  try {
    var queryString = {
      $or: [
        { heading: { $regex: ".*" + req.query.keyword + ".*", $options: "i" } },
        { body: { $regex: ".*" + req.query.keyword + ".*", $options: "i" } },
      ],
    };
    const blogs = await Blog.find(queryString);
    res.status(200).json({
      success: true,
      message: `updated specific booking slots`,
      blogs,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.toString(),
    });
  }
};
