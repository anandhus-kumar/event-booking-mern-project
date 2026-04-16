const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const bookingsRoutes = require("./routes/bookings");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingsRoutes);

const PORT = process.env.PORT || 5000;

//   mongodb connect

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to Mongo", error);
  });

app.listen(PORT, () => console.log("server is running"));
