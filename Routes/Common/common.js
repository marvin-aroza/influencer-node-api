const express = require("express");
const router = express.Router();

//User schema import
const User = require("../../Model/user");
const validateToken = require("../../Middleware/auth-middleware").validateToken;
const { BlobServiceClient } = require("@azure/storage-blob");
const connStr =
  "DefaultEndpointsProtocol=https;AccountName=influencermarketing;AccountKey=llFrTXchKFt6uWV6Nezh8Dye8fwQxjUSxWQMiQQOsBHXczEt7gKZSC3K7TApUlUwdiP6q5VPoW9e+AStYTP4Vw==;EndpointSuffix=core.windows.net";

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

const multer = require("multer");
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });
const azureFileUrl = "https://influencermarketing.blob.core.windows.net/";

//influencer profile image upload
router.post(
    "/upload-profile-image/:userId",
    singleFileUpload.single("image"),
    async (req, res) => {
      try {
        const containerName = `influencerimages1`;
        // const containerClient = blobServiceClient.getContainerClient(containerName);
        // const createContainerResponse = await containerClient.create();
        // console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
        rep = await blobServiceClient
          .getContainerClient(containerName)
          .getBlockBlobClient(req.file.originalname)
          .upload(req.file.buffer, req.file.buffer.length);
  
        imageUrl = azureFileUrl + containerName + "/" + req.file.originalname;
        const user = await User.updateOne(
          { _id: req.params.userId },
          {
            $set: {
              profImage: imageUrl,
            },
          }
        );
  
        res.status(200).json({
          code: 200,
          message: "Profile image uploaded successfully",
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