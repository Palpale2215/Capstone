const express = require("express");
const AWS = require("aws-sdk");
const e = require("express");

const app = express();
app.use(express.json()); // supaya bisa baca JSON body

// Konfigurasi AWS SDK
AWS.config.update({ region: "us-east-1" }); // sesuaikan region kamu
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Capstone";

// Endpoint POST untuk menerima data dari Lambda
app.post("/iot-data", (req, res) => {
  console.log("Menerima data dari Lambda:", req.body);

  // Di sini kamu bisa simpan ke database lokal, atau proses data lain
  // Tapi simpan data utama sudah dilakukan di Lambda (ke DynamoDB)

  res.json({ message: "Data diterima dengan sukses oleh Express.js" });
});

// Endpoint GET untuk membaca data dari DynamoDB
app.get("/data", async (req, res) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Limit: 20,
    };

    const result = await dynamodb.scan(params).promise();
    res.json(result.Items);
  } catch (err) {
    console.error("Error baca data dari DynamoDB:", err);
    res.status(500).json({ error: "Gagal ambil data", err });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Express berjalan di port ${PORT}`);
});
