class Cursada {
    constructor(codigoCursada, nombreCursada, duracionMeses, valorCursada) {
        this.codigoCursada = codigoCursada;
        this.nombreCursada = nombreCursada;
        this.duracionMeses = duracionMeses;
        this.valorCursada = valorCursada;
    }

    aumentarPrecio(porcentajeAumento) {
        this.valorCursada *= (1 + porcentajeAumento);
    }
}

const cursada1 = new Cursada("HST", "Historia Post Moderna", 6, 12000);
const cursada2 = new Cursada("MT1", "Matemática avanzada I", 10, 18500);
const cursada3 = new Cursada("MT2", "Matemática avanzada II", 9, 15000);
const cursada4 = new Cursada("LGC", "Lengua Castellana", 10, 18500);
const cursada5 = new Cursada("GEO", "Geografía Continental", 12, 20000);
const cursadas = [cursada1, cursada2, cursada3, cursada4, cursada5];

const cursadasOrden = [cursada1, cursada2, cursada3, cursada4, cursada5];
cursadasOrden.sort((curso1, curso2) => {
    const nombre1 = curso1.nombreCursada.toLocaleLowerCase();
    const nombre2 = curso2.nombreCursada.toLocaleLowerCase();
    if (nombre1 < nombre2) {
        return -1
    } else if (nombre1 > nombre2) {
        return 1
    } else {
        return 0
    }
});

localStorage.setItem("cursadasLS", JSON.stringify(cursadasOrden));


function parsearInfo(arreglo, claveLS) {
    const infoLS = localStorage.getItem(claveLS);
    if (infoLS) {
        arreglo = JSON.parse(infoLS)
    } else {
        arreglo = [];
    }
}

let alumnosxCurso;
let notasxAlumno;
parsearInfo(alumnosxCurso, "alumnosxCursoLS");
parsearInfo(notasxAlumno, "notasxAlumnoLS");

const tablaCursadas = document.getElementById("tabla-cursadas");
// if (tablaCursadas != null) {
    for (const curso of cursadasOrden) {
        let fila = document.createElement("tr");
        fila.innerHTML = 
                        `<th scope="row">${curso.codigoCursada}</th>
                        <td>${curso.nombreCursada}</td>
                        <td>${curso.duracionMeses}</td>
                        <td>${curso.valorCursada}</td>
                        <a href="alumnos.html" class="btn btn-primary m-1">Agregar Alumno</a>
                        <a href="alumnos.html" class="btn btn-primary m-1">Eliminar Alumno</a>
                        <a href="alumnos.html" class="btn btn-primary m-1">Agregar Notas</a>
                        <a href="alumnos.html" class="btn btn-primary m-1">Ver Notas</a>`;
        tablaCursadas.appendChild(fila);
    };
// }