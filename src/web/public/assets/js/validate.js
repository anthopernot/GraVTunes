'use strict';
$(function () {
    $(".user").submit(function () {
        var form = $(this);
        if (form[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.addClass('was-validated');
    });
});

let timer1, timer2, timer3, timer4, timer5, timer6;
let pseudo = document.getElementById('pseudo');
let pseudoFeedback = document.getElementById('pseudoFeedback');
let forename = document.getElementById('forename');
let forenameFeedback = document.getElementById('forenameFeedback');
let name = document.getElementById('name');
let nameFeedback = document.getElementById('nameFeedback');
let email = document.getElementById('email');
let emailFeedback = document.getElementById('emailFeedback');
let password = document.getElementById('password');
let passwordFeedback = document.getElementById('passwordFeedback');
let password_conf = document.getElementById('password_conf');
let password_confFeedback = document.getElementById('password_confFeedback');

pseudo.addEventListener('input', function () {
    clearTimeout(timer1);
    pseudo.className = 'form-control form-control-user is-pending';
    pseudo.setCustomValidity('');
    timer1 = setTimeout(function () {
        check('pseudo', pseudo, pseudoFeedback);
    }, 1000);
});
name.addEventListener('input', function () {
    clearTimeout(timer2);
    name.className = 'form-control form-control-user is-pending';
    name.setCustomValidity('');
    timer2 = setTimeout(function () {
        check('name', name, nameFeedback);
    }, 1000);
});
forename.addEventListener('input', function () {
    clearTimeout(timer3);
    forename.className = 'form-control form-control-user is-pending';
    forename.setCustomValidity('');
    timer3 = setTimeout(function () {
        check('forename', forename, forenameFeedback);
    }, 1000);
});
email.addEventListener('input', function () {
    clearTimeout(timer4);
    email.className = 'form-control form-control-user is-pending';
    email.setCustomValidity('');
    timer4 = setTimeout(function () {
        check('email', email, emailFeedback);
    }, 1000);
});
password.addEventListener('input', function () {
    clearTimeout(timer5);
    password.className = 'form-control form-control-user is-pending';
    password.setCustomValidity('');
    password_conf.className = 'form-control form-control-user';
    password_conf.setCustomValidity('');
    timer5 = setTimeout(checkPassword, 1000);
});
password_conf.addEventListener('input', function () {
    clearTimeout(timer6);
    password_conf.className = 'form-control form-control-user is-pending';
    password_conf.setCustomValidity('');
    timer6 = setTimeout(checkConfirm, 1000);
});

function checkPassword() {
    if (password.value.length < 8) {
        password.className = 'form-control form-control-user is-invalid';
        passwordFeedback.innerText = 'Veuillez utiliser au moins 8 caractères.';
        password.setCustomValidity(passwordFeedback.innerText);
    } else {
        password.className = 'form-control form-control-user is-valid';
    }
}

function checkConfirm() {
    if (password.value !== password_conf.value && password_conf.value) {
        password_confFeedback.innerText = '';
        password_conf.className = 'form-control form-control-user is-invalid';
        password_confFeedback.innerText = 'Les deux mots de passe ne correspondent pas.';
        password_conf.setCustomValidity(password_confFeedback.innerText);
    } else {
        password_conf.className = 'form-control form-control-user is-valid';
    }
}

function check(method, valueElement, feedbackElement) {
    $.ajax({
        url: 'validator?method=' + method + '&input=' + encodeURIComponent(valueElement.value),
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            if (res.valid) {
                valueElement.className = 'form-control form-control-user is-valid';
            } else {
                valueElement.className = 'form-control form-control-user is-invalid';
                feedbackElement.innerText = res.error;
                valueElement.setCustomValidity(res.error);
            }
        },
        error: function () {
            valueElement.className = 'form-control form-control-user is-invalid';
            feedbackElement.innerText = "Erreur AJAX";
            valueElement.setCustomValidity("Erreur");
        }
    })
}