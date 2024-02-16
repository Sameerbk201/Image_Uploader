const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { dateutil } = require("./Utils/Date_Utils");
const { mydb } = require("./models/Database");
const { Image } = require("./models/Image");
const app = express();

app.use(express.json());
app.use(cors());
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      cb(null, "uploads/");
    } catch (error) {
      console.log(`[+] Destination Error:`);
      console.log(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + "-" + file.originalname);
    } catch (error) {
      console.log(`[+] filename error :`);
      console.log(error);
    }
  },
});
const upload = multer({ storage });

// POST endpoint for uploading image
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageName = req.file.filename;
    const newImage = new Image({
      image: imageName,
    });
    const image = await newImage.save();
    console.log({ image });
    return res.send({ filename: req.file.filename });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// Serve the built React app
app.use(express.static(path.join(__dirname, "build")));

app.get("/get-image", async (req, res) => {
  try {
    const images = await Image.find({});
    console.log(images);
    return res.json({ status: true, message: images });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
});
// Serve React app for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  mydb;
  console.log(`Server is running on port ${PORT}`);
});
