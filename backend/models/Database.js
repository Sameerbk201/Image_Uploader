const mongoose = require("mongoose");

class DataBaseConfig {
  constructor() {
    if (!DataBaseConfig.instance) {
      this.ConnectToDb();
      DataBaseConfig.instance = this;
    }
  }
  ConnectToDb = async () => {
    console.log(`[+] Connecting to DataBase`);
    mongoose
      .connect("mongodb://localhost:27017/Image_Uploader_v1")
      .then(() => {
        console.log("[+] MongoDB Connection Succeeded. ");
      })
      .catch((err) => {
        console.log("[-] Error in DB connection: " + err);
      });
  };
}
module.exports.mydb = new DataBaseConfig();
