const router = require("express").Router();

router.get("/login", (req, res) => {
  res.send("loggin in");
});

module.exports = router;
