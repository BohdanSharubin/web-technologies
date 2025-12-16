import { validateForm, formatEmail, } from "./validator.js";
const formElem = [
    {
        id: "username",
        element: document.getElementById('username')
    },
    {
        id: "email",
        element: document.getElementById('email')
    },
    {
        id: "password",
        element: document.getElementById('password')
    },
    {
        id: "password_repeat",
        element: document.getElementById('password_repeat')
    },
    {
        id: "age",
        element: document.getElementById('age')
    },
    {
        id: "birthdate",
        element: document.getElementById('birthdate')
    },
];
function getElem(elem) {
    return document.getElementById(elem);
}
function getSubscritionType() {
    const subscriptionElem = document.querySelector('input[name="subscription"]:checked');
    return subscriptionElem.value;
}
function getData() {
    return {
        username: getElem("username").value.trim() || "",
        age: Number(getElem("age").value) || 0,
        password: getElem("password").value || "",
        email: getElem("email").value.trim() || "",
        repeatPassword: getElem("password_repeat").value || "",
        birthdate: new Date(getElem("birthdate").value) || new Date(),
        subscription: getSubscritionType(),
    };
}
addEventListener("submit", (event) => {
    event.preventDefault();
    const userData = getData();
    const errors = validateForm(userData);
    formElem.filter(fe => !errors.find(err => err.id === fe.id))
        .forEach(fe => clearError(fe.element));
    errors.forEach(err => {
        const inputElem = getElem(err.id);
        if (!isAlertExists(inputElem)) {
            createAlertMessageFor(inputElem);
        }
        showError(inputElem, err.error);
    });
    if (errors.length === 0) {
        alert("Form is valid!");
        saveFormData(userData);
    }
    else {
        console.log("Validation errors:", errors);
    }
});
function showError(input, message) {
    const errorElement = document.getElementById(`${input?.id}-error`);
    input?.classList.add('invalid');
    input?.classList.remove('valid');
    input?.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.classList.add('active');
}
function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    input.classList.remove('invalid');
    input.classList.add('valid');
    input.removeAttribute('aria-invalid');
    if (errorElement) {
        errorElement.remove();
    }
}
function createAlertMessageFor(elemBefore) {
    const alertDiv = document.createElement('div');
    alertDiv.id = `${elemBefore.id}-error`;
    alertDiv.classList.add('error');
    alertDiv.ariaLive = 'polite';
    elemBefore.setAttribute('aria-describedby', `${elemBefore.id}-error`);
    elemBefore.after(alertDiv);
}
function isAlertExists(elem) {
    return document.getElementById(`${elem.id}-error`) !== null;
}
function saveFormData(userForm) {
    const userData = {
        username: userForm.username,
        email: formatEmail(userForm.email),
        age: userForm.age,
        birthdate: userForm.birthdate,
        subscription: userForm.subscription,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
}
//# sourceMappingURL=index.js.map