const express = require("express");
const mongoose = require("mongoose");
const catMe = require("cat-me");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas", err));

const app = express();

app.use(express.json());

const foodRoutes = require("./routes/foodRoutes");
app.use("/api/foods", foodRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Groceraid!");
});

app.get("/hello", (req, res) => {
  console.log("Hello!");
  res.send("Hello there");
});

app.get("*", (req, res) => {
  res.send("Error! That route doesn't exist.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(catMe());
  console.log(`App listening on port ${PORT}`);
});