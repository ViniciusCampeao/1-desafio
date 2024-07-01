const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');

function saveEmailToLocalStorage(email) {
    localStorage.setItem('savedEmail', email);
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

emailForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    if (validateEmail(email)) {
        saveEmailToLocalStorage(email);
        showAlertBelow(emailInput, 'Email salvo com sucesso', 'sucesso');
        emailError.textContent = '';
    } else {
        emailError.textContent = 'Por favor, insira um email válido.';
    }
});

function showAlertBelow(element, message, type) {
    const alertElement = document.createElement('div');
    alertElement.className = `alert ${type}`;
    alertElement.textContent = message;
    element.parentNode.insertBefore(alertElement, element.nextSibling);
}

emailInput.addEventListener('input', function() {
    emailError.textContent = '';
});
