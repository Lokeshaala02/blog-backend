const router = require("express").Router();
const Blog = require("./blogModel");

//get all
router.get("/", (req, res) => {
  Blog.find()
    .then((blogs) => res.json(blogs))
    .catch((err) => res.status(400).json("Error: " + err));
  console.log("Blogs sent");
});

//get by id
router.get("/blog/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json("Error: " + err));
  console.log("Blog sent");
});

//insertion
router.post("/blog/add", (req, res) => {
  const newBlog = new Blog({
    id: crypto.randomUUID().toString(),
    title: req.body.title,
    discription: req.body.discription,
    date: req.body.date,
  });

  newBlog
    .save()
    .then(() => res.json("Blog added"))
    .catch((err) => res.status(400).json("Error: " + err));
  console.log("Blog added");
});

//deletion
router.delete("/blog/delete/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json("Blog deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
  console.log("Blog deleted");
});

//updation
router.put("/blog/update/:id", (req, res) => {
  Blog.findById(req.params.id).then((blog) => {
    blog.title = req.body.title;
    blog.discription = req.body.discription;
    blog.date = req.body.date;

    blog
      .save()
      .then(() => res.json("Blog updated"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
