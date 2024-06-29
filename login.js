document.addEventListener('DOMContentLoaded', function () {
    var loginBtn = document.getElementById('loginBtn');
    var loginPopup = document.getElementById('loginPopup');
    var signupPopup = document.getElementById('signupPopup');
    var closeBtns = document.querySelectorAll('.close');
    var openSignup = document.getElementById('openSignup');
    var openLogin = document.getElementById('openLogin');

    // Abrir popup de login
    loginBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        loginPopup.style.display = 'block';
    });

    // Fechar popups
    closeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            loginPopup.style.display = 'none';
            signupPopup.style.display = 'none';
        });
    });

    // Abrir popup de cadastro
    openSignup.addEventListener('click', function (event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        loginPopup.style.display = 'none';
        signupPopup.style.display = 'block';
    });

    // Abrir popup de login a partir do popup de cadastro
    openLogin.addEventListener('click', function (event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        signupPopup.style.display = 'none';
        loginPopup.style.display = 'block';
    });

    // Fechar popup ao clicar fora dele
    window.addEventListener('click', function (event) {
        if (event.target == loginPopup) {
            loginPopup.style.display = 'none';
        }
        if (event.target == signupPopup) {
            signupPopup.style.display = 'none';
        }
    });
});
