// IMPORT
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
const AuthorizationMiddleware = require('./middleware/AuthorizationMiddleware');
const app = express();

// CONFIG
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// MIDDLEWARE
app.use(AuthorizationMiddleware);
app.use(formidableMiddleware({encoding: 'utf-8'}));
app.use(cors());

// ROUTES
const user = require("./routes/api/user");
const snap = require("./routes/api/snap");

app.use("/api/user", user);
app.use("/api/snap", snap);

// LISTEN
app.listen(config.port, config.host, () => console.log(`Listening on port '${config.port}'`));


