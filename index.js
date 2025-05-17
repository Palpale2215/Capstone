const express = require("express");
const AWS = require("aws-sdk");

const app = express();
const port = 3000;

// Konfigurasi AWS menggunakan environment variable
AWS.config.update({
  region: process.env.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.get("/", (req, res) => {
  res.send("Server Express jalan!");
});

app.get("/data", async (req, res) => {
  try {
    const result = await dynamoDB
      .scan({
        TableName: "Capstone", // Ganti dengan nama tabel kamu
      })
      .promise();

    res.json(result.Items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
