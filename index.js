const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const cors = require("cors");

AWS.config.update({ region: "us-east-1" }); // Ganti region

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.get("/data", async (req, res) => {
  const params = {
    TableName: "SensorData",
    Limit: 10,
    ScanIndexForward: false,
  };
  try {
    const data = await dynamoDB.scan(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
