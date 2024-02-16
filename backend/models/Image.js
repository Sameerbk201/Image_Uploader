const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
let imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageSchema);
//Export the model
module.exports.Image = Image;
