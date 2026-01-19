require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const bookRoutes = require("./Route/bookRoutes");
const userRoutes = require("./Route/userRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://libstore-catalog.vercel.app/"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
