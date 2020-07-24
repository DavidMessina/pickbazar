window.addEventListener("load", function () {

    let firstName = document.querySelector("input.firstName");
    firstName.addEventListener("blur", function () {
        if (firstName.value.length < 2) {
            let message = "El nombre debe tener al menos 2 caracteres"
            document.querySelector("span.firstName").innerText = message;
        } else {
            document.querySelector("span.firstName").innerText = ""
        };
    })

    let lastName = document.querySelector("input.lastName");
    lastName.addEventListener("blur", function () {
        if (lastName.value.length < 2) {
            let message = "El apellido debe tener al menos 2 caracteres"
            document.querySelector("span.lastName").innerText = message;
        } else {
            document.querySelector("span.lastName").innerText = ""
        };
    })

    let email = document.querySelector("input.email");
    email.addEventListener("blur", function () {
        if (email.value.indexOf('@') < 0) {
            let message = "Debe ingresar un Email valido"
            document.querySelector("span.email").innerText = message;
        } else {
            document.querySelector("span.email").innerText = ""
        };
    })

    let phone = document.querySelector("input.phone");
    phone.addEventListener("blur", function () {
        let noNumero = isNaN(phone.value)
        if (noNumero) {
            let message = "Solo números"
            document.querySelector("span.phone").innerText = message;
        }
        else if (phone.value.length != 10) {
            let message = "El teléfono debe tener 10 dígitos e incluir el código de area"
            document.querySelector("span.phone").innerText = message;
        }
        else {
            document.querySelector("span.phone").innerText = ""
        };
    })

    let password = document.querySelector("input.password");
    password.addEventListener("blur", function () {
        if (password.value.length < 8 || password.value.length > 12) {
            let message = "La contraseña debe tener entre 8  y 12 caracteres"
            document.querySelector("span.password").innerText = message;
        } else {
            document.querySelector("span.password").innerText = ""
        };
    })

    let passwordConfirm = document.querySelector("input.passwordConfirm");
    passwordConfirm.addEventListener("blur", function () {
        if (passwordConfirm.value != password.value || passwordConfirm.value=="") {
            let message = "La contraseña no coincide"
            document.querySelector("span.passwordConfirm").innerText = message
        } else {
            document.querySelector("span.passwordConfirm").innerText = ""
        };
    })

    let userForm = document.querySelector("form.register");
    userForm.addEventListener("submit", function (e) {

        if (document.querySelector("span.firstName").innerText ||
            document.querySelector("span.lastName").innerText ||
            document.querySelector("span.email").innerText ||
            document.querySelector("span.phone").innerText ||
            document.querySelector("span.password").innerText ||
            document.querySelector("span.passwordConfirm").innerText
            ) {
            e.preventDefault();
        };
    });

})