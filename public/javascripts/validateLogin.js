window.addEventListener("load", function () {

    let password = document.querySelector("input.password");
    password.addEventListener("blur", function () {
        if (password.value.length < 8 || password.value.length > 12) {
            let message = "La contraseña debe tener entre 8  y 12 caracteres"
            document.querySelector("span.password").innerText = message;
        } else {
            document.querySelector("span.password").innerText = ""
        };
    })


    let userLogin = document.querySelector("form.login");
    userLogin.addEventListener("submit", function (e) {

        if (
            document.querySelector("span.password").innerText
        ){
            e.preventDefault();
        };
    });

})