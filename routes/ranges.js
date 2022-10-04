const express = require("express");
const router = express.Router();
const range = require("../models/range");
const dir = "ranges";
router.get("/", async (req, res) => {
  let ranges;
  try {
    ranges = await range.find({});
  } catch (error) {}
  res.render(dir + "/index", {
    ranges: ranges,
  });
});

router.get("/create", (req, res) => {
  res.render(dir + "/create");
});

//Create new range
router.post("/create", async (req, res) => {
  let creatorName = req.session.passport.user.username;
  let name = req.body.name;
  const newRange = new range({
    name: name,
    createdBy: creatorName,
  });
  try {
    await newRange.save();
    res.redirect("../" + dir);
  } catch (error) {
    console.log("Cannot create range", error);
  }
});

//Get range by id
router.get("/edit/:id", async (req, res) => {
  const rangeEdit = await range.findById(req.params.id);

  res.render(dir + "/edit", {
    range: rangeEdit,
  });
});

//Edit range by id route
router.post("/edit/:id", async (req, res) => {
  const update = {
    name: req.body.name,
  };
  try {
    await range.findByIdAndUpdate(req.params.id, update);

    res.redirect("/" + dir);
  } catch (e) {
    console.log(e);
  }
});
//Remove range route
router.delete("/edit/:id", async (req, res) => {
  let editRange;
  try {
    editRange = await range.findById(req.params.id);
    await editRange.remove();
    res.redirect("../../" + dir);
  } catch {
    res.redirect("back");
  }
});
module.exports = router;
