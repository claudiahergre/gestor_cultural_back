const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarios.model");
const { createToken } = require("../helpers/utils");

const getAll = async (req, res) => {
  try {
    const [usuarios] = await Usuario.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const [usuarios] = await Usuario.usuarioByid(req.params.usuarioId);
    if (usuarios.length === 0) {
      return res.json({ fatal: "no existe este usuario" });
    }
    res.json(usuarios[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getByDni = async (req, res) => {
  try {
    const [usuarios] = await Usuario.usuarioByDNI(req.params.dniusuario);
    if (usuarios.length === 0) {
      return res.json({ fatal: "no existe este usuario con este dni" });
    }
    res.json([usuarios]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const [usuarios] = await Usuario.getById(usuarioId);

    res.json(usuarios[0]);
    const [result] = await Usuario.deleteById(usuarioId);

    res.send(result);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const [result] = await Usuario.updateById(usuarioId, req.body);

    //Puedo devolver el usuario modificado cuando tenga el geyById de gustavo.
    const [usuarios] = await Usuario.getById(usuarioId);

    res.json(usuarios[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const create = async (req, res) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(req.body.password, 6);
  try {
    const [result] = await Usuario.insert(req.body);
    //const [usuarios] = await Usuario.
    const [usuarioCreado] = await Usuario.getById(result.insertId);

    res.json(usuarioCreado[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const login = async (req, res) => {
  try {
    const [usuarios] = await Usuario.getByEmail(req.body.email);
    if (usuarios.length === 0) {
      return res.json({ fatal: "No hay usuario con ese email" });
    }
    const user = usuarios[0];
    //Comprobar si las password coinciden
    const passwordIguales = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIguales) {
      return res.json({ fatal: "error en el email y/o contraseña" });
    }
    res.json({
      succes: "Login correcto",
      token: createToken(user),
    });
  } catch (error) {
    res.json({ fatal: "Error" });
  }
};

module.exports = {
  remove,
  getAll,
  getById,
  getByDni,
  update,
  create,
  login,
};
