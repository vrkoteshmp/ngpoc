const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { BrowserWindow } = require("electron");


const app = express();
const PORT = 3000;

const CPM_DATA_API_KEY =
  "kg-018f8ed7-7f27-56f1-8ecc-3ea463efd555-62deebda-5ea0-43d6-9fa4-7c40288cc47d";
const RNR_API_KEY =
  "kg-04217374-f7e7-55ac-9091-762140707a48-8f23614d-e223-4018-a7a4-d904e8f61354";
let SUM_API_KEY =
  "kg-0c5a18cb-1d49-5049-9d7c-14c5d763bb48-d932e320-b6e3-4db8-a008-442a417cf9b0";
const SEX_API_KEY =
  "kg-560d72e0-f871-5b18-906c-ff4772e5c4c7-dcb77628-bc20-4e8d-84f0-928379bcb704";
const OCR_API_KEY =
  "kg-d6430057-4cab-5630-99a7-07d3f249108d-eb1455c1-9ba7-4aa3-ae6b-6c65e44028d5";

app.use(cors());
app.use(express.json());

app.post("/api/process", async (req, res) => {
  try {
    // console.log("Request Body: " + JSON.stringify(req.body));
    const response = await axios.post(
      "https://agent-platform.kore.ai/api/v1/process/a-23985726-d9c6-5de4-8af5-42e94e73115c",
      req.body,
      {
        headers: {
          "x-api-key": CPM_DATA_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Error forwarding request to Kore.ai:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/processException", async (req, res) => {
  try {
    const response = await axios.post(
      "https://agent-platform.kore.ai/api/v1/process/a-f83dcbaa-74a2-5968-bacd-70bdfc02cb54",
      req.body,
      {
        headers: {
          "x-api-key": SEX_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Error forwarding request to Kore.ai:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/summarize", async (req, res) => {
  let sumUrl = "https://agent-platform.kore.ai/api/v1/process/a-6dba0477-df2b-5059-adb0-d0d52bfdfa60";
  sumUrl = "https://agent-platform.kore.ai/api/v1/process/a-95b5ae57-ef35-5322-aea4-fc44d96424ec";
  SUM_API_KEY = "kg-212dae17-0bb1-5728-9ad3-47ae1075ad82-44ddb21f-a1d5-4493-976b-373ea8cb8f46";
  try {
    const response = await axios.post(
      sumUrl,
      req.body,
      {
        headers: {
          "x-api-key": SUM_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error(
      "Error forwarding request to Kore.ai for Summarize api:",
      err.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/ocrExtract", async (req, res) => {
  try {
    const response = await axios.post(
      "https://agent-platform.kore.ai/api/v1/process/a-5597a495-9fa7-5091-ae2c-f03264fb0381",
      req.body,
      {
        headers: {
          "x-api-key": OCR_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error(
      "Error forwarding request to Kore.ai for Ocr Extraction api:",
      err.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/getSorData", async (req, res) => {
  try {
    const response = await axios.get(
      "https://rmgp8qro72.execute-api.us-east-1.amazonaws.com/NgDemoiDev/getSorData",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Error forwarding request sor data:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/openProcessedDoc", async (req, res) => {
  try {
    createWindow();
    const response = { "": 200, data: "Window opened successfully" };
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Error forwarding request sor data:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/config", (req, res) => {
  const newConfig = req.body;
  fs.writeFileSync("./masterData.json", JSON.stringify(newConfig, null, 2));
  res.send({ status: "updated" });
});


function createWindow() {
  let win = new Window.open("https://example.com");
  win.open();
}

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

// app.get("/api/get-presigned-url", async (req, res) => {
//   const command = new PutObjectCommand({
//     Bucket: "natgen--demo",
//     Key: "ngDocuments/" + Date.now() + ".txt", // dynamic file name
//     ContentType: "text/plain",
//   });

//   const url = await getSignedUrl(s3, command, { expiresIn: 60 }); // 60 sec
//   res.json({ url });
// });
