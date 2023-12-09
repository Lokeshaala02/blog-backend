const router = require("express").Router();

const User = require("./userModel");

//get all
router.get("/admin/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (password === user.password) {
          res.json({
            message: "Login Successful!",
            user: user,
          });
        } else {
          res.json({
            message: "Password Incorrect!",
          });
        }
      } else {
        res.json({
          message: "User not found!",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error Occured!",
      });
    });
});

//register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json({
          message: "User Exists!",
        });
      } else {
        const newUser = new User({
          id: crypto.randomUUID().toString(),
          name: name,
          email: email,
          password: password,
          isAdmin: false,
        });
        newUser
          .save()
          .then(() => {
            res.json({
              message: "User Registered!",
            });
          })
          .catch((err) => {
            res.json({
              message: "Error Occured!",
            });
          });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error Occured!",
      });
    });
});

module.exports = router;
