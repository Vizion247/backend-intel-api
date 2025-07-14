const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/log-visitor', async (req, res) => {
  const { name } = req.body;
  try {
    const ipInfo = await fetch('https://ipapi.co/json/').then(r => r.json());
    const data = {
      name,
      ip: ipInfo.ip,
      city: ipInfo.city,
      country: ipInfo.country_name,
      userAgent: req.headers['user-agent'],
      timestamp: new Date()
    };

    console.log('Logged visitor:', data); // Replace with DB if needed
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error logging:', err);
    res.status(500).json({ error: 'Failed to log' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
