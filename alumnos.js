let alumnos = [
    {
        "nombreAlumno": "Juan",
        "sexo": "M",
        "edad": 20
    },
    {
        "nombreAlumno": "Maria",
        "sexo": "F",
        "edad": 23
    },
    {
        "nombreAlumno": "Pedro",
        "sexo": "M",
        "edad": 32
    },
    {
        "nombreAlumno": "Jose",
        "sexo": "M",
        "edad": 43
    },
    {
        "nombreAlumno": "Gloria",
        "sexo": "F",
        "edad": 19
    },
    {
        "nombreAlumno": "Martha",
        "sexo": "F",
        "edad": 36
    },
    {
        "nombreAlumno": "Gustavo",
        "sexo": "M",
        "edad": 27
    }
];
const tablaHTML = 
    `<thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Género</th>
            <th scope="col">Edad</th>
        </tr>
    </thead>
    <tbody id="tabla-alumnos-items">
    </tbody>`;
let i = -1;

let alumnosLS = localStorage.getItem("alumnosLS");
if (alumnosLS) {
    alumnos = JSON.parse(alumnosLS);
} else {
    alumnos = [];
}

listaAlumnos();

function cargarBotonEliminar() {
    const botones = document.querySelectorAll(".botonEliminar");
    for (const boton of botones) {
        boton.onclick = (e) => {
            const alumnoId = e.currentTarget.id;
            i = alumnos.findIndex((alumno) => alumno.nombreAlumno === alumnoId);
            alumnos.splice(i, 1);
            eliminarAlumno(i+1);
            localStorage.setItem("alumnosLS", JSON.stringify(alumnos));
            console.log(alumnos);
        }
    }
}

function eliminarAlumno(i) {
    const tabla = document.getElementById("tabla-alumnos");
    tabla.deleteRow(i);
}

function listaAlumnos() {
    // limpiamos la tabla
    const tabla = document.getElementById("tabla-alumnos");
    tabla.innerHTML = '';

    // configuramos de nuevo la estructura HTML de la tabla y la llenamos
    tabla.innerHTML = tablaHTML;
    const tablaAlumnos = document.getElementById("tabla-alumnos-items");
    console.log(alumnos);
    for (const alumno of alumnos) {
        let fila = document.createElement("tr");
        fila.classList.add("fila-alumno")
        fila.innerHTML = 
                    `<th scope="row">${alumno.nombreAlumno}</th>
                    <td>${alumno.sexo}</td>
                    <td>${alumno.edad}</td>
                    <a href="#eliminarAlumno" class="btn btn-primary m-1 botonEliminar" id="${alumno.nombreAlumno}">Eliminar Alumno</a>`;
        tablaAlumnos.appendChild(fila);
    };
    cargarBotonEliminar();
};

const botonAgregar = document.getElementById("botonAgregar");
botonAgregar.onclick = () => {
    const alumnoNombreTexto = document.getElementById("nombreAlumno");
    const hintNombre = document.getElementById("AlumnoNombreHint");
    if (alumnoNombreTexto.value == "") {
        hintNombre.innerText = "DEBE indicar el nombre del Alumno";
    } else {
        const alumnoExiste = alumnos.find((item) => item.nombreAlumno == alumnoNombreTexto.value);
        if (alumnoExiste) {
            hintNombre.innerText = "YA EXISTE el nombre del Alumno indicado";
        } else {
            hintNombre.innerText = "";
            const edadAlumnoTexto = document.getElementById("edadAlumno");
            const sexoAlumnoTexto = document.getElementById("sexoAlumno");
            let nuevoA = {
                "nombreAlumno": alumnoNombreTexto.value,
                "sexo": sexoAlumnoTexto.value,
                "edad": edadAlumnoTexto.value
            }
            alumnos.push(nuevoA);
            localStorage.setItem("alumnosLS", JSON.stringify(alumnos));
            alumnoNombreTexto.value = "";
            edadAlumnoTexto.value = "";
            listaAlumnos();
        }
    }
}