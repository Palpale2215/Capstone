require("dotenv").config();
const express = require("express");
const path = require("path");
const AWS = require("aws-sdk");

const app = express();
app.use(express.json());

// Serve static files dari folder "public"
app.use(express.static(path.join(__dirname, "public")));
// Konfigurasi AWS SDK dengan env variables, termasuk session token
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN, // wajib kalau pakai session token
  region: process.env.AWS_REGION || "us-east-1",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Capstone";

app.get("/data", async (req, res) => {
  try {
    const params = { TableName: TABLE_NAME, Limit: 20 };
    const result = await dynamodb.scan(params).promise();
    res.json(result.Items);
  } catch (err) {
    console.error("Error baca data dari DynamoDB:", err);
    res.status(500).json({ error: "Gagal ambil data", detail: err.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
