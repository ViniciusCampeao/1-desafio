document.addEventListener('DOMContentLoaded', function() {
  var firstName = document.getElementById('first-name');
  var lastName = document.getElementById('last-name');
  var email = document.getElementById('email');
  var message = document.getElementById('message');
  var submitButton = document.querySelector('.submit-button');

  const showError = (input, message) => {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
  };

  const clearError = (input) => {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = '';
  };

  const validateForm = () => {
    const firstNameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(firstName.value);
    const lastNameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(lastName.value);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    const messageValid = message.value.length >= 10;

    if (!firstNameValid) {
      showError(firstName, 'Por favor, insira um nome válido.');
    } else {
      clearError(firstName);
    }

    if (!lastNameValid) {
      showError(lastName, 'Por favor, insira um sobrenome válido.');
    } else {
      clearError(lastName);
    }

    if (!emailValid) {
      showError(email, 'Digite um email valido (e.g., example@example.com)');
    } else {
      clearError(email);
    }

    if (!messageValid) {
      showError(message, 'A mensagem deve ter pelo menos 10 caracteres.');
    } else {
      clearError(message);
    }

    submitButton.disabled = !(firstNameValid && lastNameValid && emailValid && messageValid);
  };

  firstName.addEventListener('input', validateForm);
  lastName.addEventListener('input', validateForm);
  email.addEventListener('input', validateForm);
  message.addEventListener('input', validateForm);

  document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value
    };

    localStorage.setItem('contactFormData', JSON.stringify(formData));

    window.location.href = '../sucess/index.html';
  });
});
