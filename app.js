require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

app.locals.title = `Coasters App!`;

require("./config/session.config")(app),

require("./routes")(app);

require("./error-handling")(app);


module.exports = app;