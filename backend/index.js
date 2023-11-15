const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const trackRoutes = require("./routes/tracks");
const taskRoutes = require("./routes/tasks");

require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

// Cors asetukset
const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:5173",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
