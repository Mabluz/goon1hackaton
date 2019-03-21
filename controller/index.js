"use strict";
const express = require('express');
const router = express.Router();
const tracking = require('../service/preformTracking');

router.get("/", async (req, res, next) => {
    if(req.query && req.query.t) {
        if(handleData(req.query.t))
            return res.sendStatus(200);
    }
    return res.sendStatus(200);
});

router.post("/", async (req, res, next) => {
    if(req.body && req.body.data) {
        if(handleData(req.body.data))
            return res.sendStatus(200);
    }
    return res.sendStatus(200);
});

function handleData(data) {
    try {
        data = decodeURIComponent(data);
    } catch (e) {}
    try {
        data = JSON.parse(data);
    } catch (e) {
        return true;
    }
    if(data.compNames && data.compNames.length > 0) {
        tracking(data);
        return true;
    }
    return false;
}

module.exports = router;