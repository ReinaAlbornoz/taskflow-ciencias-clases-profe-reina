const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'));
// 1. IMPORTAR TUS ARCHIVOS
const registrarAcceso = require('./middlewares/logger');
const pacienteRoutes = require('./routes/pacienteRoutes');

// 2. CONFIGURACIÓN (Middlewares)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(registrarAcceso); // 🌸 Esto anota las visitas en logs/log.txt

// 3. CARPETA PÚBLICA
app.use(express.static(path.join(__dirname, 'public')));

// 4. RUTAS
app.use('/pacientes', pacienteRoutes);

// Ruta de estado
app.get('/status', (req, res) => {
    res.json({ 
        status: "Operativo", 
        profe: "Reina Albornoz",
        proyecto: "TaskFlow Ciencias"
    });
});

// 5. ENCENDER EL SERVIDOR (Versión simplificada sin errores)
app.listen(3000, () => {
    console.log('\x1b[35m%s\x1b[0m', '==============================================');
    console.log('\x1b[35m%s\x1b[0m', '🌸 SERVIDOR INICIADO - PROYECTO REINA ALBORNOZ 🌸');
    console.log('\x1b[34m%s\x1b[0m', '🚀 Acceso: http://localhost:3000');
    console.log('\x1b[35m%s\x1b[0m', '==============================================');
});
 