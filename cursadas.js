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

let alumnos;
let alumnosLS = localStorage.getItem("alumnosLS");
if (alumnosLS) {
    alumnos = JSON.parse(alumnosLS);
} else {
    alumnos = [];
}

let alumnosxCurso;
let alumxCLS = localStorage.getItem("alumnosxCursoLS");
if (alumxCLS) {
    alumnosxCurso = JSON.parse(alumxCLS);
} else {
    alumnosxCurso = [];
}

let notasxAlumno;
let notasxCLS = localStorage.getItem("notasxAlumnoLS");
if (notasxCLS) {
    notasxAlumno = JSON.parse(notasxCLS);
} else {
    notasxAlumno = [];
}

let i = -1;
let etiquetasHTML = '';

const tablaCursadas = document.getElementById("tabla-cursadas");
for (const curso of cursadasOrden) {
    let fila = document.createElement("tr");
    fila.innerHTML = 
                    `<th scope="row">${curso.codigoCursada}</th>
                    <td>${curso.nombreCursada}</td>
                    <td>${curso.duracionMeses}</td>
                    <td>${curso.valorCursada}</td>`;
    tablaCursadas.appendChild(fila);
};

// cargamos formulario agregar alumno a cursada
const cursadaIngreso = document.getElementById("formIngresoAlumno");
etiquetasHTML = 
    `<label class="form-label">Seleccione la Cursada</label>
    <select class="form-select col-3 mb-3" id="cursadaIngreso">`;
cursadasOrden.forEach((curso) => {
    etiquetasHTML = etiquetasHTML + `<option value="${curso.codigoCursada}">${curso.nombreCursada}</option>`;
})
etiquetasHTML = etiquetasHTML + `</select>`;
etiquetasHTML = etiquetasHTML + 
    `<label class="form-label">Seleccione el Alumno</label>
    <select class="form-select col-3 mb-3" id="alumnoIngreso">`;
alumnos.forEach((alumno) => {
    etiquetasHTML = etiquetasHTML + `<option value="${alumno.nombreAlumno}">${alumno.nombreAlumno}</option>`;
})
etiquetasHTML = etiquetasHTML + `</select>`;
etiquetasHTML = etiquetasHTML + `<div id="cursadaAlumnoHint" class="form-text text-bg-danger"></div>`;
etiquetasHTML = etiquetasHTML + `<button type="button" class="btn btn-primary mt-3" id="botonAgregarAlCursada">Agregar</button>`;

cursadaIngreso.innerHTML = etiquetasHTML;

const botonAgregar = document.getElementById("botonAgregarAlCursada");
botonAgregar.onclick = () => {
    const cursadaIngreso = document.getElementById("cursadaIngreso");
    const alumnoIngreso = document.getElementById("alumnoIngreso");
    const cursadaAlumnoHint = document.getElementById("cursadaAlumnoHint");

    i = alumnosxCurso.findIndex((alumno) => alumno.codigoCursada === cursadaIngreso.value && alumno.nombreAlumno === alumnoIngreso.value);
    if (i > -1) {
        cursadaAlumnoHint.innerText = "ERROR: YA existe el alumno " + alumnoIngreso.value + " en el curso " + cursadaIngreso.value;
    } else {
        let nuevoAC = {
            "codigoCursada": cursadaIngreso.value,
            "nombreAlumno": alumnoIngreso.value
        }
        alumnosxCurso.push(nuevoAC);
        localStorage.setItem("alumnosxCursoLS", JSON.stringify(alumnosxCurso));
        console.table(alumnosxCurso);
    }
}

                    // <a href="alumnos.html" class="btn btn-primary m-1">Agregar Alumno</a>
                    // <a href="alumnos.html" class="btn btn-primary m-1">Eliminar Alumno</a>
                    // <a href="alumnos.html" class="btn btn-primary m-1">Agregar Notas</a>
                    // <a href="alumnos.html" class="btn btn-primary m-1">Ver Notas</a>