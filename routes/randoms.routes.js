//Requires
const { Router } = require("express");
const { getData } = require("../controllers/random.controller.js");
const router = Router();

router.get("/", getData);
module.exports = router;
