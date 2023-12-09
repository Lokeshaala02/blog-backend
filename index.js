const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./blog/blog");
const userRouter = require("./User/user");

require("dotenv").config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// userROutes
app.use("/api/users", userRouter);
// blogRoutes
app.use("/api/blogs", blogRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "blog",
});

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
