const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Phone", price: 25000 },
    { id: 3, name: "Headphones", price: 2000 }
  ]);
});

// ✅ Must listen on 0.0.0.0 for Docker
app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on port 5000");
});