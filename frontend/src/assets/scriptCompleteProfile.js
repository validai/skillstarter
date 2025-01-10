document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form');
  const submitButton = document.querySelector('.btn-submit');
  const inputs = form.querySelectorAll('input, select, textarea');

  function validateInputs() {
    let allFilled = true;
    inputs.forEach(input => {
      if (input.value.trim() === '') {
        allFilled = false;
        input.classList.add('input-required');
      } else {
        input.classList.remove('input-required');
      }
    });
    submitButton.disabled = !allFilled;
  }

  inputs.forEach(input => {
    input.addEventListener('input', validateInputs);
  });

  validateInputs(); // Initial check
});
