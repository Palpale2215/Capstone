const express = require("express");
const app = express();

app.use(express.json()); // supaya bisa baca JSON body

app.post("/iot-data", (req, res) => {
  console.log("Menerima data dari Lambda:", req.body);

  // Di sini kamu bisa simpan ke database lokal, atau proses data lain
  // Untuk contoh, kita cuma balas sukses
  res.json({ message: "Data diterima dengan sukses oleh Express.js" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Express jalan di port ${PORT}`);
});
