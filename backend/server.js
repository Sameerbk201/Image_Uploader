const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { dateutil } = require("./Utils/Date_Utils");
const { mydb } = require("./models/Database");
const app = express();

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
      cb(
        null,
        file.originalname +
          "-" +
          dateutil.getFormattedDate() +
          path.extname(file.originalname)
      );
    } catch (error) {
      console.log(`[+] filename error :`);
      console.log(error);
    }
  },
});

const upload = multer({ storage });

// POST endpoint for uploading image
app.post("/upload", upload.single("image"), (req, res) => {
  try {
    console.log(`[+] Upload Request for : ${req.file.filename}`);
    console.log(req.file.originalname);
    res.send({ filename: req.file.filename });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

app.get("/", async (req, res) => {
  return res.status(200).json({ status: true, message: "Server_Running" });
});

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  mydb;
  console.log(`Server is running on port ${PORT}`);
});
