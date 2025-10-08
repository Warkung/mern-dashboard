const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");

require("dotenv").config();
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors());

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

// Start the server
const runServer = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Connect to MongoDB
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(url);
  console.log("Connected to MongoDB");
};

// Start the server and connect to MongoDB
const start = async () => {
  try {
    await connectDB();
    runServer();
  } catch (error) {
    console.log(error);
  }
};

start();
