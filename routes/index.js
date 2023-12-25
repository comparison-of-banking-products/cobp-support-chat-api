const router = require("express").Router();

const supportsRouter = require("./supports");

router.use("/supports", supportsRouter);

module.exports = router;
