function obtenerElementoPorId(id) {
    return document.getElementById(id);
}

const botonMostrarCompletadas = obtenerElementoPorId("botonMostrarCompletadas");
const botonMostrarIncompletas = obtenerElementoPorId("botonMostrarIncompletas");
const listaTareas = obtenerElementoPorId("listadoTareas");

let todasLasTareas = [];

async function cargarTodasLasTareas() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos");
        
        if (respuesta.ok) {
            todasLasTareas = await respuesta.json();
            console.log("¡Todas las tareas cargadas!");
        } else {
            console.error(`Error al cargar todas las tareas: ${respuesta.status} ${respuesta.statusText}`);
            listaTareas.innerHTML = '<li>Error al cargar las tareas iniciales.</li>';
        }
    } catch (error) {
        console.error("Hubo un problema con la petición Fetch para cargar todas las tareas:", error);
        listaTareas.innerHTML = '<li>Error de conexión. Asegúrese de tener internet.</li>';
    }
}

function mostrarTareasEnHTML(tareasAMostrar, esCompletada) {
    listaTareas.innerHTML = '';

    if (tareasAMostrar.length === 0) {
        const elementoMensaje = document.createElement("li");
        elementoMensaje.textContent = esCompletada ? "No hay tareas completadas." : "No hay tareas incompletas.";
        listaTareas.appendChild(elementoMensaje);
        return;
    }

    tareasAMostrar.forEach(tarea => {
        const elementoLista = document.createElement("li");
        let textoEstado = esCompletada ? "(Completada)" : "(Incompleta)";
        elementoLista.textContent = `ID: ${tarea.id} - ${tarea.title} ${textoEstado}`;
        
        if (esCompletada) {
            elementoLista.classList.add('tarea-completada');
        } else {
            elementoLista.classList.add('tarea-incompleta');
        }
        listaTareas.appendChild(elementoLista);
    });
}

botonMostrarCompletadas.addEventListener("click", () => {
    if (todasLasTareas.length === 0) {
        cargarTodasLasTareas().then(() => {
            const tareasCompletadas = todasLasTareas.filter(tarea => tarea.completed === true);
            mostrarTareasEnHTML(tareasCompletadas, true);
        });
    } else {
        const tareasCompletadas = todasLasTareas.filter(tarea => tarea.completed === true);
        mostrarTareasEnHTML(tareasCompletadas, true);
    }
});

botonMostrarIncompletas.addEventListener("click", () => {
    if (todasLasTareas.length === 0) {
        cargarTodasLasTareas().then(() => {
            const tareasIncompletas = todasLasTareas.filter(tarea => tarea.completed === false);
            mostrarTareasEnHTML(tareasIncompletas, false);
        });
    } else {
        const tareasIncompletas = todasLasTareas.filter(tarea => tarea.completed === false);
        mostrarTareasEnHTML(tareasIncompletas, false);
    }
});

cargarTodasLasTareas();