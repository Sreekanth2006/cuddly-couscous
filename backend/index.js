const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins or specify 'http://localhost:3000'
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  const token = process.env.HF_TOKEN;
  if (!token) {
    return res.status(500).json({ message: 'HF_TOKEN is not configured' });
  }

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error("HF API Error:", errorText);
        throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("Analyze Error:", error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

app.listen(PORT, HOST, () => {
  // Log the actual host the server binds to. For external access, use the machine's ip or 0.0.0.0
  console.log(`Backend server running on http://${HOST === '0.0.0.0' ? '0.0.0.0' : HOST}:${PORT}`);
});
