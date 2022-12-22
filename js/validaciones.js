export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }
    console.log(input);
    console.log(tipoInput);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoInput, input)
    }

}

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El campo e-mail no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo constrseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo número telefónico no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX, donde cada X es un número siendo 10."
    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres."
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres."
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres."
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        // console.log(error);
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
});

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorEdad(fechaCliente)) {
        mensaje = "Es necesario que seas mayor de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());
    // console.log(diferenciaFechas)
    return diferenciaFechas <= fechaActual;
}

