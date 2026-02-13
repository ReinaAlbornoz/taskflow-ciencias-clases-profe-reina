class Tarea {
    constructor(id, descripcion, fechaLimite) {
        this.id = id;
        this.descripcion = descripcion;
        this.estado = 'pendiente';
        this.fechaLimite = fechaLimite;
    }
}

class GestorTareas {
    constructor() {
        this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        // Si está vacío, cargamos los desafíos de la Profe Reina
        if (this.tareas.length === 0) {
            this.cargarDesafiosIniciales();
        }
        this.render();
    }

    cargarDesafiosIniciales() {
        const desafios = [
            new Tarea(1, "Explica la función de la mitocondria", "2024-12-01"),
            new Tarea(2, "Camino del oxígeno en el cuerpo humano", "2024-12-05"),
            new Tarea(3, "Diferencia entre circuito en serie y paralelo", "2024-12-10")
        ];
        this.tareas = desafios;
        this.guardar();
    }

    agregar(desc, fecha) {
        const nueva = new Tarea(Date.now(), desc, fecha);
        this.mostrarNotificacion("Asignando nuevo desafío...");
        
        setTimeout(() => {
            this.tareas.push(nueva);
            this.guardar();
            this.render();
        }, 2000);
    }

    obtenerDias(fecha) {
        const hoy = new Date();
        const limite = new Date(fecha);
        const diff = Math.ceil((limite - hoy) / (1000 * 60 * 60 * 24));
        if (diff < 0) return "❌ Plazo vencido";
        if (diff === 0) return "⚠️ ¡Entrega hoy!";
        return `⏳ Te quedan ${diff} días`;
    }

    eliminar(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.guardar();
        this.render();
    }

    guardar() { localStorage.setItem('tareas', JSON.stringify(this.tareas)); }

    render() {
        const lista = document.getElementById('task-list');
        lista.innerHTML = '';
        this.tareas.forEach(t => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <div>
                    <strong>${t.descripcion}</strong><br>
                    <small>${this.obtenerDias(t.fechaLimite)}</small>
                </div>
                <button style="width:auto; padding:5px 10px;" onclick="gestor.eliminar(${t.id})">Borrar</button>
            `;
            lista.appendChild(li);
        });
    }

    mostrarNotificacion(msj) {
        const div = document.getElementById('notification');
        div.textContent = msj;
        div.classList.remove('hidden');
        setTimeout(() => div.classList.add('hidden'), 3000);
    }
}

const gestor = new GestorTareas();

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = document.getElementById('task-input').value;
    const fecha = document.getElementById('task-date').value;
    gestor.agregar(desc, fecha);
    e.target.reset();
});