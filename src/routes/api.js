const router = require('express').Router();

const { checkToken } = require("../helpers/middlewares");

router.use("/usuarios", require("./api/usuarios"));

router.use("/salas", checkToken, require("./api/salas"));

router.use("/staff", require("./api/staff"));


module.exports = router;
