const prometheus = require('prom-client');
const app = require('express');

const router = app.Router();

router.get("/", (req, res, next) => {
    res.send(prometheus.register.metrics());
});

module.exports = router;
