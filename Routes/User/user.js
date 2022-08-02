const express = require('express')
const router = express.Router();

//User schema import
const User = require('../../Model/user');
const validateToken = require('../../Middleware/auth-middleware').validateToken;
const adminRole = require("../../Middleware/admin-role").adminRole;

//get User list
router.get("/", validateToken, adminRole, async (req, res) => {
    try {
      const user = await User.find({role:"User"});
      res.status(200).json({
        code: 200,
        message: "User list fetched successfully",
        data: user,
        status: true
      });
    } catch (error) {
      res.status(500).json({ 
        code: 500,
        message: error,
        data: null,
        status: false 
      });
    }
  });

//get indiviual user details
router.get("/:userId", validateToken, async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.status(200).json({
        code: 200,
        message: "User fetched successfully",
        data: user,
        status: true
      });
    } catch (error) {
      res.status(500).json({ 
        code: 500,
        message: error,
        data: null,
        status: false 
      });
    }
  });

//Delete User
router.delete("/:userId", validateToken, adminRole, async (req, res) => {
    try {
      const user = await User.remove({ _id: req.params.userId });
      res.status(200).json({
        code: 200,
        message: "User deleted successfully",
        data: user,
        status: true
      });
    } catch (error) {
      res.status(500).json({ 
        code: 500,
        message: error,
        data: null,
        status: false 
      });
    }
  });

  //update user info
router.patch("/:userId", validateToken,  async (req, res) => {
    try {
      const user = await User.updateOne(
        { _id: req.params.userId },
        {
          $set: {
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.firstname,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
          },
        }
      );
      res.status(200).json({
        code: 200,
        message: "User updated successfully",
        data:user,
        status: true
      });
    } catch (error) {
      res.status(500).json({ 
        code: 500,
        message: error,
        data: null,
        status: false 
      });
    }
  });

  //mark user active inactive
  router.patch("/mark-status/:userId", validateToken, adminRole,  async (req, res) => {
    try {
      const user = await User.updateOne(
        { _id: req.params.userId },
        {
          $set: {
            isActive:req.body.isActive
          },
        }
      );

      let message = 'User marked as inactive successfully..!'
      if(req.body.isActive == true) {
        message = 'User marked as active successfully..!'
      }
      
      res.status(200).json({
        code: 200,
        message: message,
        data:user,
        status: true
      });
    } catch (error) {
      res.status(500).json({ 
        code: 500,
        message: error,
        data: null,
        status: false 
      });
    }
  });


module.exports = router
