const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const todoSchema = new mongoose.Schema({
  itemName: String,
  itemDescription: String,
});

const Todo = mongoose.model("Todo", todoSchema);

// Route
app.post("/submittodoitem", async (req, res) => {
  const { itemName, itemDescription } = req.body;

  const newItem = new Todo({ itemName, itemDescription });
  await newItem.save();

  res.json({ message: "Item saved successfully" });
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
