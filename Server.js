const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/distance', (req, res) => {
    const userLat = parseFloat(req.query.userLat);
    const userLng = parseFloat(req.query.userLng);
    const kpuLat = 49.187500;
    const kpuLng = -122.849000;

    const R = 6371; // Radius of Earth in km
    const dLat = (kpuLat - userLat) * (Math.PI / 180);
    const dLon = (kpuLng - userLng) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(userLat * (Math.PI / 180)) * Math.cos(kpuLat * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    res.json({ distance: distance.toFixed(2) });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
