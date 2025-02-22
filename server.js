const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow frontend to access API

const filePath = "count.json";

// Initialize count.json if not exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ count: 0 }));
}

// Endpoint to get and update visit count
app.get("/visit", (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        let count = JSON.parse(data).count;
        count++;

        fs.writeFile(filePath, JSON.stringify({ count }), (err) => {
            if (err) return res.status(500).json({ error: "Error writing file" });

            res.json({ count });
        });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
