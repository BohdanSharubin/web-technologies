const form = document.getElementById("signup_form");
// username
const usernameInput = document.getElementById('username');
// email
const emailInput = document.getElementById('email');
// password
const passwordInput = document.getElementById('password');
const passwordRepeatInput = document.getElementById('password_repeat');
// birthdate
const birthdateInput = document.getElementById('birthdate');
// age
const ageInput = document.getElementById('age');
// gender
const genderInput = document.getElementById('gender');
// interests
const interestsInput = document.querySelectorAll('input[name="interests"]:checked');
// satisfaction
const satisfactionInput = document.getElementById('range');
// subscription
const subscriptionInput = document.querySelector('input[name="subscription"]:checked');
// facts
const factsInput = document.getElementById('facts');

addEventListener('submit', HandleSubmit);

function HandleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        saveFormData()
        form.reset();
        alert("Registration complete")
    }
}

function validateForm() {
    let isValid = true;

    if (!usernameInput.value) {
        showError(usernameInput, "Username can't be empty")
        isValid = false;
    } else {
        clearError(usernameInput);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        showError(emailInput, "Enter correct email in format example@text.org")
        isValid = false;
    } else {
        clearError(emailInput)
    }

    if (!passwordInput.value) {
        showError(passwordInput, "Password can't be empty");
        isValid = false;
    } else if(passwordInput.value.length < 4) {
        showError(passwordInput, "Password must be at least 4 characters")
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    if (!passwordRepeatInput ) {
        showError(passwordRepeatInput, "Repeat your password");
        isValid = false;
    } else if (passwordInput.value !== passwordRepeatInput.value) {
        showError(passwordRepeatInput, "Passwords do not match");
        isValid = false;
    } else {
        clearError(passwordRepeatInput);
    }

    return isValid;
}

function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    input.classList.add('invalid');
    input.classList.remove('valid');
    input.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.classList.add('active');
}

function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    input.classList.remove('invalid');
    input.classList.add('valid');
    input.removeAttribute('aria-invalid');
    errorElement.textContent = '';
    errorElement.classList.remove('active');
}

function saveFormData() {
const userData = {
username: usernameInput.value,
email: emailInput.value
};
localStorage.setItem('userData', JSON.stringify(userData));
}