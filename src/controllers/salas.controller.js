const Sala = require("../models/salas.model");

// const getReservadas = async (req, res) => {
//   try {
//     const [salas] = await Sala.salasReservadas();
//     res.json([salas]);
//   } catch (error) {
//     res.json({ fatal: error.message });
//   }
// };

// //TODO CAMBIAR RESERVADAS Y LIBRES CON FUNCIÓN COMPROBARSALAS

// const getLibres = async (req, res) => {
//   try {
//     const [salas] = await Sala.salasLibres();
//     res.json([salas]);
//   } catch (error) {
//     res.json({ fatal: error.message });
//   }
// };
const getAll = async (req, res) => {
  try {
    const [salas] = await Sala.getAllSalas();
    res.json(salas);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const [salas] = await Sala.salaByid(req.params.salaId);
    if (salas.length === 0) {
      return res.json({ fatal: "no existe esta sala" });
    }
    res.json(salas[0]);
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

// const getByUsuario = async (req, res) => {
//   try {
//     const [salas] = await Sala.usuarioSala(req.params.usersala);
//     res.json(salas[0]);
//   } catch (error) {
//     res.json({ fatal: error.message });
//   }
// };

const remove = async (req, res) => {
  try {
    const { salaId } = req.params;
    const [salas] = await Sala.getById(salaId);
    const [result] = await Sala.deleteById(salaId);

    res.json(salas[0])
    res.send(result)

  } catch (error) {
    res.json({ fatal: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { salaId } = req.params
    const [result] = await Sala.updateById(salaId, req.body)
    const [salas] = await Sala.getById(salaId);

    res.json(salas[0])
  } catch (error) {
    res.json({ fatal: error.message })
  }
}

const create = async (req, res) => {
  try {

    const [result] = await Sala.insert(req.body);
    console.log(result)
    const [salas] = await Sala.getById(result.insertId);

    res.json(salas[0])
  } catch (error) {
    res.json({ fatal: error.message });
  }
}

const comprobarSala = async (req, res) => {
  try {
    const { salas_id, fecha_reserva, hora_reserva } = req.body;
    const salaDisponible = await Sala.checkSalas(salas_id, fecha_reserva, hora_reserva)
    if (salaDisponible[0].length === 0) {
      res.json({ disponible: true });
    } else {
      res.json({ disponible: false})
    }
  } catch (error) {
    res.json({ fatal: error.message });
  }
};

module.exports = {
  getAll,
  // getByUsuario,
  getById,
  remove,
  update,
  create,
  comprobarSala
};
