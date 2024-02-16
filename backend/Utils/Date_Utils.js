class DateUtils {
  getFormattedDate = () => {
    const currentDate = new Date();
    const formattedDate =
      currentDate.getDate().toString().padStart(2, "0") +
      "-" +
      (currentDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      currentDate.getFullYear().toString().slice(-2) +
      "-" +
      currentDate.getHours().toString().padStart(2, "0") +
      "-" +
      currentDate.getMinutes().toString().padStart(2, "0") +
      "-" +
      currentDate.getSeconds().toString().padStart(2, "0");
    return formattedDate;
  };
}

module.exports.dateutil = new DateUtils();
