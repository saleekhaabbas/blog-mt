const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

// env
dotenv.config({ path: "./config/.env" });

// db
const app = express();

//cors policy
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Connect to database
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route files
const auth = require("./routes/auth");
const blog = require("./routes/blog");

// Mount routers
app.use("/api/auth", auth);
app.use("/api/blog", blog);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`port is running ${PORT}`));
