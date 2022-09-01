const express = require("express");
const Router = express.Router();
const restrictAccess = require("./middleware").restrictAccess;
const checkAdmin = require("./middleware").checkAdmin;

const Course = require("./schema/Course");

Router.get("/course/:id", restrictAccess, async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    return res.json({ success: true, course: course });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, err: "Bad Request" });
  }
});

// Post Routes
Router.post("/course", restrictAccess, checkAdmin, async (req, res) => {
  try {
    const newCourse = new Course({
      name: req.body.name,
      material: req.body.material,
      sections: req.body.sections,
    });

    await newCourse.save();
    return res.json({ success: true, msg: "Course Added" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, err: "Bad Request: Missing Values" });
  }
});

// Delete Routes
Router.delete("/course/:id", restrictAccess, checkAdmin, async (req, res) => {
  try {
    await Course.findByIdAndRemove(req.params.courseId);
    // Send OTP
    return res.json({ success: true, msg: "Course deleted" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, err: "Bad Request: Id is incorrect" });
  }
});

// Patch Routes
Router.patch("/course/:id", restrictAccess, checkAdmin, async (req, res) => {
  const filedsToUpdate = Object.keys(req.body);

  const updatedCourse = {};

  filedsToUpdate.forEach((field) => {
    updatedCourse[field] = req.body[field];
  });

  try {
    await Course.findByIdAndUpdate(req.params.id, updatedCourse);
    return res.json({ success: true, err: "course updated" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, err: "Bad Request" });
  }
});

module.exports = Router;
