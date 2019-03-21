const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require("./bin/config");
const app = express();
const helmet = require('helmet');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(helmet({
    frameguard: false
}));

app.use("/", require('./controller/index'));
app.use('/metrics', require('./controller/metric-controller'));
// Health check is being used by OpenShift to determine ready state, etc.
app.use('/health', require('./controller/healthcheck-controller'));
app.use(express.static(path.join(__dirname, 'frontend-tealium-script')));


if (!process._eval) {
    app.listen(config.port, function () {
        console.log('HTTP server started at port ' + config.port);
    });
}

module.exports = app;