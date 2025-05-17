const express = require("express");
const AWS = require("aws-sdk");
const app = express();

AWS.config.update({
  region: process.env.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.get("/data", async (req, res) => {
  try {
    const result = await dynamoDB.scan({ TableName: "SensorData" }).promise();
    res.json(result.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
