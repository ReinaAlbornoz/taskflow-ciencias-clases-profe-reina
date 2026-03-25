const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Ruta para obtener todos los pacientes
// GET http://localhost:3000/pacientes
router.get('/', (req, res) => {
    // Aquí podrías llamar a una función del controlador para listar
    res.json({ mensaje: "Lista de pacientes (Próximamente)" });
});

// Ruta para registrar un nuevo paciente (aquí se calcula el IMC)
// POST http://localhost:3000/pacientes
router.post('/', pacienteController.registrarPaciente);

// Ruta para eliminar un paciente por ID
// DELETE http://localhost:3000/pacientes/:id
 router.delete('/:id', pacienteController.eliminarPaciente); 

module.exports = router;