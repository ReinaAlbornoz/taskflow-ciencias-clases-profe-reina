const fs = require('fs');
const path = require('path');

const registrarAcceso = (req, res, next) => {
    const ahora = new Date();
    const contenido = `[${ahora.toLocaleString()}] Acceso a la ruta: ${req.url} - Método: ${req.method}\n`;

    // Esto crea o escribe en logs/log.txt
    fs.appendFile(path.join(__dirname, '../logs/log.txt'), contenido, (err) => {
        if (err) console.error("Error al escribir el log");
    });

    next(); // Esto le dice a Express que siga a la siguiente función
};

module.exports = registrarAcceso;
