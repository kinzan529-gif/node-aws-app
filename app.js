const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

let visitorCount = 0;

app.get('/', (req, res) => {
    visitorCount++;
    const timestamp = new Date().toISOString();
    const containerId = os.hostname(); 

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>DevOps Web Application</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background-color: #f4f6f9; color: #333; }
                .card { background: white; padding: 30px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                h1 { color: #0066cc; }
                .metric { font-size: 1.2em; margin: 10px 0; }
                .highlight { font-weight: bold; color: #ff6600; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Deployment Successful!</h1>
                <p>Node.js App running on AWS EC2 via Kubernetes (Minikube).</p>
                <hr>
                <div class="metric">🕒 Current Timestamp: <span class="highlight">${timestamp}</span></div>
                <div class="metric">📦 Container ID: <span class="highlight">${containerId}</span></div>
                <div class="metric">👥 Visitor Counter: <span class="highlight">${visitorCount}</span></div>
            </div>
        </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', container: os.hostname() });
});

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});