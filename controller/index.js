"use strict";
const express = require('express');
const router = express.Router();
const tracking = require('../service/preformTracking');

router.get("/", async (req, res, next) => {
    if(req.query && req.query.t) {
        let data;
        try {
            data = JSON.parse(req.query.t);
        } catch (e) {
            return res.sendStatus(500);
        }
        if(data.compNames && data.compNames.length > 0) {
            tracking(data);
            return res.sendStatus(200);
        }
    }
    return res.sendStatus(500);
});

module.exports = router;