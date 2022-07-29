const express = require("express");
const router = express.Router();

// collab schema
const Collab = require("../../Model/collab");
const User = require("../../Model/user");
const { validateToken } = require("../../Middleware/auth-middleware")

// collab request
router.post(
  "/request-collab/",
  validateToken,
  async (req, res) => {
    try {
      const collab = await Collab.create({
        userId: req.body.userId,
        influencerId: req.body.influencerId,
      });

      let message = "Collab request sent successfully..!";

      res.status(200).json({
        code: 200,
        message: message,
        data: collab,
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

// accept collab request
router.post(
  "/accept-collab/:requestId",
  validateToken,
  async (req, res) => {
    try {
      const collab = await Collab.updateOne(
        {
          _id: req.params.requestId,
        },
        {
          $set: {
            status: "Accepted",
          },
        }
      );

      let message = "Collab request accepted successfully..!";

      res.status(200).json({
        code: 200,
        message: message,
        data: collab,
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

// accept collab request
router.post(
  "/reject-collab/:requestId",
  validateToken,
  async (req, res) => {
    try {
      const collab = await Collab.updateOne(
        {
          _id: req.params.requestId,
        },
        {
          $set: {
            status: "Rejected",
          },
        }
      );

      let message = "Collab request rejected successfully..!";

      res.status(200).json({
        code: 200,
        message: message,
        data: collab,
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

// get collab requests
router.get(
  "/get-collab-list/:status",
  validateToken,
  async (req, res) => {
    try {
      const collab = await Collab.aggregate([
        // ategory_id: mongoose.Types.ObjectId(req.params.catId), 
        {$match: { status: req.params.status }},
        {
          $addFields: {
            newUserId: { $toObjectId: "$userId" },
            newinfluencerId: { $toObjectId: "$influencerId" },
          },
        },
        {
          $lookup: {
            from: User.collection.name,
            localField: "newUserId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: User.collection.name,
            localField: "newinfluencerId",
            foreignField: "_id",
            as: "influencer",
          },
        },
        { $sort: { _id: -1 } },
      ]);
      let message = "Collab request list fetched successfully..!";

      res.status(200).json({
        code: 200,
        message: message,
        data: collab,
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

// get collab requests
router.get(
  "/get-collab-by-id/:influencerId/:status",
  validateToken,
  async (req, res) => {
    try {
      let match = { influencerId: req.params.influencerId };
      if(req.params.status !== 'All') {
        match = { influencerId: req.params.influencerId ,status: req.params.status }

      }
      const collab = await Collab.aggregate([
        // ategory_id: mongoose.Types.ObjectId(req.params.catId), 
        {$match: match},
        {
          $addFields: {
            newUserId: { $toObjectId: "$userId" },
            newinfluencerId: { $toObjectId: "$influencerId" },
          },
        },
        {
          $lookup: {
            from: User.collection.name,
            localField: "newUserId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: User.collection.name,
            localField: "newinfluencerId",
            foreignField: "_id",
            as: "influencer",
          },
        },
        { $sort: { _id: -1 } },
      ]);

      let message = "Collab request list fetched successfully..!";

      res.status(200).json({
        code: 200,
        message: message,
        data: collab,
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

router.get(
  "/get-collab-by-id-user/:userId/:status",
  validateToken,
  async (req, res) => {
    try {
      let match = { userId: req.params.userId };
      if(req.params.status !== 'All') {
        match = { userId: req.params.userId ,status: req.params.status }

      }
      const collab = await Collab.aggregate([
        {$match: match},
        {
          $addFields: {
            newUserId: { $toObjectId: "$userId" },
            newinfluencerId: { $toObjectId: "$influencerId" },
          },
        },
        {
          $lookup: {
            from: User.collection.name,
            localField: "newUserId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: User.collection.name,
            localField: "newinfluencerId",
            foreignField: "_id",
            as: "influencer",
          },
        },
        { $sort: { _id: -1 } },
      ]);

      let message = "Collab request list fetched successfully..!";

      res.status(200).json({
        code: 200,
        message: message,
        data: collab,
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
