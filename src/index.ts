
import { FormData, FormElement, subscriptionType, UserData } from "./types.js";
import { validateForm, formatEmail, } from "./validator.js";

const formElem: FormElement[] = [
    { 
        id: "username",
        element: document.getElementById('username') as HTMLInputElement | null 
    },
    { 
        id: "email",
        element: document.getElementById('email') as HTMLInputElement | null
    },
    {
        id: "password", 
        element: document.getElementById('password') as HTMLInputElement | null
    },
    {
        id: "password_repeat", 
        element: document.getElementById('password_repeat') as HTMLInputElement | null 
    },
    { 
        id: "age", 
        element: document.getElementById('age') as HTMLInputElement | null 
    },
    {
        id: "birthdate", 
        element: document.getElementById('birthdate') as HTMLInputElement | null 
    },

];

function getElem(elem: string): HTMLInputElement {
    return document.getElementById(elem) as HTMLInputElement;
}

function getSubscritionType(): subscriptionType {
    const subscriptionElem = document.querySelector('input[name="subscription"]:checked') as HTMLInputElement;
    return subscriptionElem.value as subscriptionType;
}

function getData(): FormData {
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
    const userData: FormData = getData();
    const errors = validateForm(userData);
    formElem.filter(fe => !errors.find(err => err.id === fe.id))
        .forEach(fe => clearError(fe.element as HTMLElement));
    errors.forEach(err => {
        const inputElem: HTMLInputElement = getElem(err.id);
        if (!isAlertExists(inputElem)) {
            createAlertMessageFor(inputElem);
        }
        showError(inputElem, err.error);
    });
    if (errors.length === 0) {
        alert("Form is valid!");
        saveFormData(userData);
    } else {
        console.log("Validation errors:", errors);
    }
});

function showError(input: HTMLInputElement | null, message: string) {
    const errorElement = document.getElementById(`${input?.id}-error`) as HTMLElement;
    input?.classList.add('invalid');
    input?.classList.remove('valid');
    input?.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.classList.add('active');
}

function clearError(input: HTMLElement) {
    const errorElement = document.getElementById(`${input.id}-error`) as HTMLElement | null;
    input.classList.remove('invalid');
    input.classList.add('valid');
    input.removeAttribute('aria-invalid');
    if (errorElement) {
        errorElement.remove();
    }
}

function createAlertMessageFor(elemBefore: HTMLInputElement): void {
    const alertDiv: HTMLElement = document.createElement('div');
    alertDiv.id = `${elemBefore.id}-error`;
    alertDiv.classList.add('error');
    alertDiv.ariaLive = 'polite';
    elemBefore.setAttribute('aria-describedby', `${elemBefore.id}-error`);
    elemBefore.after(alertDiv);
}

function isAlertExists(elem: HTMLInputElement): boolean {
    return document.getElementById(`${elem.id}-error`) !== null;
}

function saveFormData(userForm: FormData): void {
    const userData: UserData = {
        username: userForm.username,
        email: formatEmail(userForm.email),
        age: userForm.age,
        birthdate: userForm.birthdate,
        subscription: userForm.subscription,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
}
