const express = require("express");
const axios = require("axios"); // pastikan sudah install: npm install axios

const app = express();
app.use(express.json());

const LAMBDA_API_URL =
  "https://2k1z57w6ak.execute-api.us-east-1.amazonaws.com/capstone";

// Menerima data dari Lambda (via POST)
app.post("/iot-data", (req, res) => {
  console.log("📥 Data diterima dari Lambda:", req.body);

  // Bisa disimpan ke database lokal, atau hanya logging
  res.json({ message: "✅ Data diterima oleh Express.js" });
});

// Mengambil data dari Lambda (via API Gateway GET request)
app.get("/data", async (req, res) => {
  try {
    const response = await axios.post(LAMBDA_API_URL, {
      action: "get",
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Gagal ambil data dari Lambda:", error.message);
    res.status(500).json({
      error: "Gagal ambil data dari Lambda",
      detail: error.message,
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Express.js berjalan di http://localhost:${PORT}`);
});
