const express = require("express");
const router = express.Router();

//User schema import
const User = require("../../Model/user");
const InfluencerProfile = require("../../Model/influencerProfile");
const validateToken = require("../../Middleware/auth-middleware").validateToken;
const adminRole = require("../../Middleware/admin-role").adminRole;



//get Influencer list
router.get("/", validateToken, adminRole, async (req, res) => {
  try {
    const user = await User.find({ role: "Influencer" });
    res.status(200).json({
      code: 200,
      message: "Influencer list fetched successfully",
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

//get indiviual Influencer details
router.get("/:userId", validateToken, adminRole, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json({
      code: 200,
      message: "Influencer fetched successfully",
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

//Delete Influencer
router.delete("/:userId", validateToken, adminRole, async (req, res) => {
  try {
    const user = await User.remove({ _id: req.params.userId });
    res.status(200).json({
      code: 200,
      message: "Influencer deleted successfully",
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

//update Influencer info
router.patch("/:userId", validateToken, adminRole, async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.firstname,
          email: req.body.email,
          phone: req.body.phone,
          gender: req.body.gender,
        },
      }
    );
    res.status(200).json({
      code: 200,
      message: "Influencer updated successfully",
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

//mark Influencer active inactive
router.patch(
  "/mark-status/:userId",
  validateToken,
  adminRole,
  async (req, res) => {
    try {
      const user = await User.updateOne(
        { _id: req.params.userId },
        {
          $set: {
            isActive: req.body.isActive,
          },
        }
      );

      let message = "Influencer marked as inactive successfully..!";
      if (req.body.isActive == true) {
        message = "Influencer marked as active successfully..!";
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
  }
);

//Update profile
router.post(
  "/update-profile-additional/",
  validateToken,
  async (req, res) => {
    try {
      const user = await InfluencerProfile.updateOne(
        { userId: req.body.userId },
        {
          $set: {
            userId: req.body.userId,
            links: req.body.links,
            budget: req.body.budget,
            location: req.body.location,
            officeAddress: req.body.officeAddress,
            ratings: req.body.ratings
          },
        },
        {
          upsert: true
        }
      );

      let message = "Profile updated successfully..!";

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
  }
);

module.exports = router;
