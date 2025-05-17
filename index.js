const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Ganti URL ini dengan endpoint API Gateway Lambda-mu
const API_GATEWAY_URL =
  "https://2k1z57w6ak.execute-api.us-east-1.amazonaws.com/capstone/data";

app.post("/iot-data", (req, res) => {
  console.log("Menerima data dari Lambda:", req.body);
  // Simpan lokal atau proses lain jika perlu
  res.json({ message: "Data diterima dengan sukses oleh Express.js" });
});

app.get("/data", async (req, res) => {
  try {
    const response = await axios.get(API_GATEWAY_URL);
    res.json(response.data);
  } catch (err) {
    console.error("Error ambil data dari Lambda:", err);
    res.status(500).json({ error: "Gagal ambil data", err: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Express berjalan di port ${PORT}`);
});
