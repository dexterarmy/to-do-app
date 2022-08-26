const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // console.log(conObj.connections);
    console.log("database connection successful");
  })
  .catch((err) => console.log(err.name, err.message));

app.listen(3000, () => console.log("listening on port 3000"));
