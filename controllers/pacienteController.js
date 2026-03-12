const fs = require('fs');
const path = require('path');

// Esta es la ruta al archivo donde se guardan los datos
const pfilePath = path.join(__dirname, '../data/pacientes.json');

exports.registrarPaciente = (req, res) => {
    try {
        const { nombre, peso, altura } = req.body;

        // Validamos que el usuario envíe los datos necesarios
        if (!nombre || !peso || !altura) {
            return res.status(400).json({ error: "Faltan datos de salud del paciente" });
        }

        // 1. CÁLCULO DE IMC (Lógica de negocio)
        const imc = (peso / (altura * altura)).toFixed(2);
        let estado = "";
        if (imc < 18.5) {
            estado = "Bajo peso";
        } else if (imc >= 18.5 && imc <= 24.9) {
            estado = "Peso normal";
        } else {
            estado = "Obeso";
        }

        // 2. PERSISTENCIA: LEER datos actuales
        let pacientes = [];
        if (fs.existsSync(pfilePath)) {
            const dataExtraida = fs.readFileSync(pfilePath, 'utf-8');
            pacientes = JSON.parse(dataExtraida);
        }

        // 3. ACTUALIZAR la lista con el nuevo registro
        const nuevoPaciente = {
            id: Date.now(),
            nombre,
            peso,
            altura,
            imc,
            estado,
            fecha: new Date().toLocaleString()
        };
        pacientes.push(nuevoPaciente);

        // 4. PERSISTENCIA: GUARDAR la lista actualizada en el archivo plano
        fs.writeFileSync(pfilePath, JSON.stringify(pacientes, null, 2));

        // Respuesta rosa/lila para el cliente
        res.status(201).json({
            mensaje: "🌸 Registro guardado con éxito en el archivo plano",
            datos: nuevoPaciente
        });

    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ error: "Hubo un problema al procesar los datos del paciente" });
    }
};