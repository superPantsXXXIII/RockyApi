const express = require("express");
const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"Check out the documentaition for more info on the diffrent requests avilable"});
})

module.exports = router;