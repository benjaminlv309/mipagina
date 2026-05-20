const hobbies = [];

function validar() {
    const usernameValido = validarUsername();
    const passwordValido = validarPassword();
    const rePasswordValido = validarRePassword();
    const addressValido = validarAddress();
    const comunaValido = validarComuna();
    const phoneValido = validarPhone();
    const websiteValido = validarWebsite();
    const hobbiesValidos = validarHobbies();
    const valido =
        usernameValido && passwordValido && rePasswordValido && addressValido && comunaValido && phoneValido && websiteValido && hobbiesValidos;
    const mensaje = document.getElementById("mensaje-exito");
    if (valido) {
        const usuario = {
            username: document.getElementById("username").value,
            direccion: document.getElementById("address").value,
            comuna: document.getElementById("comuna").value,
            telefono: document.getElementById("phone").value,
            website: document.getElementById("website").value,
            hobbies: hobbies
        };
        console.log(usuario);
        mensaje.innerText = "Formulario enviado correctamente.";
        mensaje.style.display = "block";
    } else {
        mensaje.style.display = "none";
    }
    return false;
}

function agregarHobby() {
    const input = document.getElementById("hobby");
    const div = document.getElementById("hobby-msg");
    const hobby = input.value.trim();
    if (hobby == "") {
        div.innerText = "Debe ingresar una afición.";
        return;
    }
    for (let i = 0; i < hobbies.length; i++) {
        if (
            hobbies[i].toLowerCase() == hobby.toLowerCase()
        ) {
            div.innerText = "La afición ya existe.";
            return;
        }
    }
    hobbies.push(hobby);
    input.value = "";
    div.innerText = "";
    mostrarHobbies();
}

function eliminarHobby(index) {
    hobbies.splice(index, 1);
    mostrarHobbies();
}

function mostrarHobbies() {
    const lista = document.getElementById("hobby-list");
    lista.innerHTML = "";
    for (let i = 0; i < hobbies.length; i++) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerText =
            hobbies[i];
        const boton = document.createElement("button");
        boton.innerText = "Eliminar";
        boton.className = "btn btn-danger btn-sm";
        boton.type = "button";
        boton.onclick = function () {
            eliminarHobby(i);
        };
        li.appendChild(boton);
        lista.appendChild(li);
    }
}

function validarUsername() {
    const username = document.getElementById("username").value.trim();
    const div = document.getElementById("username-msg");
    if (username == "") {
        div.innerText = "Debe ingresar un nombre.";
        return false;
    }
    if (username.length < 5 || username.length > 10
    ) {
        div.innerText = "Debe tener entre 5 y 10 caracteres.";
        return false;
    }
    let numeros = false;
    for (let i = 0; i < username.length; i++) {
        const char = username[i].toLowerCase();
        const letra = char >= "a" && char <= "z";
        const numero = char >= "0" && char <= "9";
        if (!letra && !numero) {
            div.innerText = "No se permiten símbolos.";
            return false;
        }
        if (i == 0 && !letra) {
            div.innerText = "Debe comenzar con letra.";
            return false;
        }
        if (numero) {
            numeros = true;
        }
        if (letra && numeros) {
            div.innerText = "Los números deben ir al final.";
            return false;
        }
    }
    div.innerText = "";
    return true;
}

function validarPassword() {
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const div = document.getElementById("password-msg");
    if (password == "") {
        div.innerText = "Debe ingresar una clave.";
        return false;
    }
    if (password.length < 3 || password.length > 6
    ) {
        div.innerText = "Debe tener entre 3 y 6 caracteres.";
        return false;
    }
    let letra = false;
    let numero = false;
    for (let i = 0; i < password.length; i++) {
        const char = password[i].toLowerCase();
        if (char >= "a" && char <= "z"
        ) {
            letra = true;
        }
        if (char >= "0" && char <= "9"
        ) {
            numero = true;
        }
    }
    if (!letra || !numero) {
        div.innerText = "Debe contener letras y números.";
        return false;
    }
    if (username != "" && password.includes(username)
    ) {
        div.innerText = "La clave no puede contener el nombre.";
        return false;
    }
    div.innerText = "";
    return true;
}

function validarRePassword() {
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("re-password").value;
    const div = document.getElementById("re-password-msg");
    if (rePassword == "") {
        div.innerText = "Debe repetir la clave.";
        return false;
    }
    if (password != rePassword) {
        div.innerText = "Las claves no coinciden.";
        return false;
    }
    div.innerText = "";
    return true;
}

function validarAddress() {
    const address = document.getElementById("address").value.trim();
    const div = document.getElementById("address-msg");
    if (address == "") {
        div.innerText = "Debe ingresar una dirección.";
        return false;
    }
    div.innerText = "";
    return true;
}

function validarComuna() {
    const comuna = document.getElementById("comuna").value;
    const div = document.getElementById("comuna-msg");
    if (comuna == "") {
        div.innerText = "Debe seleccionar una comuna.";
        return false;
    }
    div.innerText = "";
    return true;
}

function validarPhone() {
    const phone = document.getElementById("phone").value.trim();
    const div = document.getElementById("phone-msg");
    if (phone == "") {
        div.innerText = "Debe ingresar un teléfono.";
        return false;
    }
    if (phone.length < 8) {
        div.innerText = "El teléfono debe tener al menos 8 dígitos.";
        return false;
    }
    for (let i = 0; i < phone.length; i++) {
        const char = phone[i];
        if (!(char >= "0" && char <= "9")) {
            div.innerText = "Solo se permiten números.";
            return false;
        }
    }
    div.innerText = "";
    return true;
}

function validarWebsite() {
    const website = document.getElementById("website").value.trim();
    const div = document.getElementById("website-msg");
    if (website == "") {
        div.innerText = "";
        return true;
    }
    if (!website.startsWith("http://") && !website.startsWith("https://")
    ) {
        div.innerText = "La URL debe comenzar con http:// o https://";
        return false;
    }
    let dominio = website.replace("https://", "").replace("http://", "");
    if (!dominio.includes(".")) {
        div.innerText = "Debe ingresar una URL válida.";
        return false;
    }
    div.innerText = "";
    return true;
}

function validarHobbies() {
    const div = document.getElementById("hobby-msg");
    if (hobbies.length < 2) {
        div.innerText = "Debe ingresar al menos 2 aficiones.";
        return false;
    }
    div.innerText = "";
    return true;
}
