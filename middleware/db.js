const mongoose = require("mongoose");

const connectDB = (url, port, app) => {
  return mongoose
    .connect(url)
    .then(() => {
      app.listen(port, () => {
        console.log(`App is running on port ${port}`);
      });
    })
    .catch((err) => {
      console.log({ err });
    });
};

module.exports = connectDB;
