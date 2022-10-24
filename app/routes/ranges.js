const express = require("express");
const router = express.Router();
const range = require("../models/range");
const isAdmin = require("../routes/middlewares/isAdmin");

router.get("/", async (req, res) => {
  let ranges;
  try {
    ranges = await range
      .find({}, { __v: 0 })
      .populate("createdBy", "_id username");
  } catch (error) {}
  res.send({ ranges: ranges });
});

//Create new range
router.post("/create", isAdmin, async (req, res) => {
  let creatorName = req.session.passport.user;
  let name = req.body.name;
  const newRange = new range({
    name: name,
    createdBy: creatorName._id,
  });
  try {
    await newRange.save();
    console.log("Created new range");
  } catch (error) {
    console.log("Cannot create range", error);
  }
});

//Get range by id
router.get("/:id/", isAdmin, async (req, res) => {
  const rangeEdit = await range.findById(req.params.id, { __v: 0 });
  res.send({ range: rangeEdit });

  //TODO try
});

//Edit range by id route
router.post("/edit/:id/", isAdmin, async (req, res) => {
  const update = {
    name: req.body.name,
  };
  try {
    await range.findByIdAndUpdate(req.params.id, update);

    res.send({ message: "Successfully updated range" });
  } catch (e) {
    res.send({ message: "Can't update range" });
    console.log(e);
  }
});

//Remove range route
router.delete("/delete/:id/", isAdmin, async (req, res) => {
  let rangeToDelete;
  try {
    rangeToDelete = await range.findById(req.params.id);
    await rangeToDelete.remove();
    res.send({ message: "Successfully deleted range" });
  } catch {
    res.send({ message: "Can't delete range" });
  }
});

module.exports = router;
