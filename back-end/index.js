const express = require("express");
const mongoose = require("mongoose");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    "mongodb+srv://james:helloworld@cluster0.0i2slae.mongodb.net/fullstackdb"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(3000, () => {
  console.log("Backend is running");
});
