"use strict";

const express = require("express");
const router = express.Router();
const func = require('../src/functions');

router.get("/api/index", (req, res) => {
    let data = func.getData("index");
    res.send(data);
})

router.get("/api/about", (req, res) => {
    let data = func.getData("about");
    res.send(data);
})

router.get("/api/press", (req, res) => {
    let data = func.getData("press");
    res.send(data);
})

module.exports = router;