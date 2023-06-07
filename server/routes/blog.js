const express = require("express");

const router = express.Router();

const {
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  searchBlog,
} = require("../controllers/blog");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, addBlog)
  .get(protect, getBlog)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

router.get("/search", searchBlog);

module.exports = router;
