const express = require("express");
const router = express.Router();

// collab schema
const Collab = require("../../Model/collab");

// collab request
router.post(
  "/request-collab/",
  // validateToken,
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
  // validateToken,
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

// get collab requests
router.get(
  "/get-collab-list/",
  // validateToken,
  async (req, res) => {
    try {
      const collab = await Collab.find({});

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
  "/get-collab-by-id/:influencerId",
  // validateToken,
  async (req, res) => {
    try {
      const collab = await Collab.find({
        influencerId: req.params.influencerId,
      });

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
