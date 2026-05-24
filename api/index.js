const https = require('https');

const UPSTOX_TOKEN = 'eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiIyMkFZQTQiLCJqdGkiOiI2OWZmODM2YmMxNmQyYzUwMmRlZGNiMzAiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNQbHVzUGxhbiI6ZmFsc2UsImlzRXh0ZW5kZWQiOnRydWUsImlhdCI6MTc3ODM1MzAwMywiaXNzIjoidWRhcGktZ2F0ZXdheS1zZXJ2aWNlIiwiZXhwIjoxODA5OTAwMDAwfQ.7mQ-uUS9RoWuwZg5i6k_t75D_moqL2bswnoIbV5QfTo';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { path } = req.query;
  if (!path) {
    res.status(400).json({ error: 'path required' });
    return;
  }

  const url = `https://api.upstox.com/v2/${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${UPSTOX_TOKEN}`,
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
