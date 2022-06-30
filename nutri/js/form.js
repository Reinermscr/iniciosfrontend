var botonAdicionar = document.querySelector("#adicionar-paciente");

botonAdicionar.addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.querySelector("#formadicionar");
    var paciente = capturarDatosPaciente(form);
    var pacienteTr = contruirTr(paciente);

    var errores = validarPaciente(paciente)
    if (errores.length > 0) {
        exibirMensajesErrores(errores);
        return;
    };
    var tablas = document.querySelector("#tabla-pacientes");
    tablas.appendChild(pacienteTr);
    form.reset();

    var MensajesErrores = document.querySelector("#mensajes-errores")
    MensajesErrores.innerHTML = ""

});

function capturarDatosPaciente(form) {
    // captura los datos del formulario
    var paciente = {
        nombre: form.nombre.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calcularIMC(form.peso.value, form.altura.value)
    }

    return paciente;
};

function contruirTr(paciente) {
    //crear los tds y un tr
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(construirTd(paciente.nombre, "info-nombre"));
    pacienteTr.appendChild(construirTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(construirTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(construirTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(construirTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function construirTd(dato, clase) {

    var td = document.createElement("td");
    td.classList.add(clase)
    td.textContent = dato;

    return td;

}

function validarPaciente(paciente) {
    var errores = []
    if (paciente.nombre.length == 0) {
        errores.push("Nombre esta vacio");
    }
    if (paciente.peso.length == 0) {
        errores.push("Peso esta vacio");
    }
    if (paciente.altura.length == 0) {
        errores.push("La altura no puede estar vacia");
    }
    if (paciente.gordura.length == 0) {
        errores.push("El % de gordura no puede estar vacio");
    }
    if (!validarPeso(paciente.peso)) {
        errores.push("Peso es incorrecto");
    }
    if (!validarAltura(paciente.altura)) {
        errores.push("Altura incorrecta");
    }
    return errores;
}

function exibirMensajesErrores(errores) {
    var ul = document.querySelector("#mensajes-errores")
    ul.innerHTML = ""

    errores.forEach(function (error) {
        var li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
    });

}