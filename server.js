// server.js
import express from 'express';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/track/:orderID', (req, res) => {
    const orderID = req.params.orderID;

    exec(`node track.js ${orderID}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ status: 'error', message: 'Server error', error });
        }

        try {
            const json = JSON.parse(stdout);
            return res.json(json);
        } catch (err) {
            return res.status(500).json({ status: 'error', message: 'Invalid JSON response' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
