const express = require('express');
const router = express.Router();

var statusCode = 200;
var shutdownRegistered = false;

router.get("/", (req, res, next) => {
    if (!shutdownRegistered) {
        shutdownRegistered = true;
        req.app.on('SHUTDOWN_REQUESTED', (warning) => {
            statusCode = 503;
        });
    }
    if (statusCode !== 200) {
        req.app.emit('SHUTDOWN_SIGNALLED_TO_LB')
    }
    res.status(statusCode).send();
});


module.exports = router;