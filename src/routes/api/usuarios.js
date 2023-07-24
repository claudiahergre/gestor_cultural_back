const router = require('express').Router();

const usuariosController = require('../../controllers/usuarios.controller');
const { checkUsuarioId } = require("../../helpers/middlewares");


//GET
router.get("/", usuariosController.getAll);
router.get('/:usuarioId',/*checkUsuarioId,*/ usuariosController.getById);
router.get('/dni/:dniusuario', usuariosController.getByDni);

//POST
router.post('/registro', usuariosController.create);
router.post("/login", usuariosController.login);


// PUT
router.put("/editar/:usuarioId", checkToken, usuariosController.update);

//DELETE
router.delete("/:usuarioId", checkToken, usuariosController.remove);


module.exports = router;
