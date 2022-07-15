const express = require("express");
const router = express.Router();

//User schema import
const User = require("../../Model/user");
const validateToken = require("../../Middleware/auth-middleware").validateToken;
const adminRole = require("../../Middleware/admin-role").adminRole;

//get Admin list
router.get("/", validateToken, adminRole, async (req, res) => {
  try {
    const user = await User.find({ role: "Admin" });
    res.status(200).json({
      code: 200,
      message: "Admin list fetched successfully",
      data: user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
      data: null,
      status: false,
    });
  }
});

//get indiviual Admin details
router.get("/:adminId",validateToken, adminRole, async (req, res) => {
  try {
    const user = await User.findById(req.params.adminId);
    res.status(200).json({
      code: 200,
      message: "Admin fetched successfully",
      data: user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
      data: null,
      status: false,
    });
  }
});

//Delete Admin
router.delete("/:adminId", validateToken, adminRole, async (req, res) => {
  try {
    const user = await User.remove({ _id: req.params.adminId });
    res.status(200).json({
      code: 200,
      message: "Admin deleted successfully",
      data: user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
      data: null,
      status: false,
    });
  }
});

//update Admin info
router.patch("/:adminId", validateToken, adminRole, async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.adminId },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.firstname,
          email: req.body.email,
          phone: req.body.phone,
          gender: req.body.gender
        },
      }
    );
    res.status(200).json({
      code: 200,
      message: "Admin updated successfully",
      data: user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
      data: null,
      status: false,
    });
  }
});

//mark admin active inactive
router.patch("/mark-status/:adminId", validateToken, adminRole, async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.adminId },
      {
        $set: {
          isActive: req.body.isActive,
        },
      }
    );

    let message = "User marked as inactive successfully..!";
    if (req.body.isActive === true) {
      message = "User marked as active successfully..!";
    }

    res.status(200).json({
      code: 200,
      message: message,
      data: user,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error,
      data: null,
      status: false,
    });
  }
});

module.exports = router;
