const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const pacienteRoutes = require('./routes/pacienteRoutes');

app.use(express.json());
app.use(express.static('public'));

// Enlazamos las rutas que acabas de activar
app.use('/pacientes', pacienteRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});