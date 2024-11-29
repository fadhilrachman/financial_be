const { s3 } = require("../lib/aws-config");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const uploadImg = async ({ req, res }) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading file");
      }
      const payload = {
        name: data.Key,
        url: data.Location,
      };

      const result = await prisma.img.create({ data: payload });

      return res.status(200).json({ message: "Upload berhasil", result });
    });
  } catch (error) {
    console.log({ error });

    res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
};

module.exports = {
  uploadImg,
};
