document.addEventListener('DOMContentLoaded', function() {
  const formData = JSON.parse(localStorage.getItem('contactFormData'));
  if (formData) {
    document.getElementById('form-data').innerText = 
      `First Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail adress: ${formData.email}\nMessage: ${formData.message}`;
  }
});