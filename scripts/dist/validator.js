export function validateUsername(name) {
    const trimmed = name.trim();
    const regex = /^[A-ZА-ЯЁЇІЄҐ][a-zа-яёїієґ]{1,}$/;
    return regex.test(trimmed);
}
export function validateAge(age) {
    return age >= 1 && age <= 120;
}
export function validateEmail(email) {
    const formatedEmail = formatEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formatedEmail))
        return false;
    const domain = formatedEmail.split("@")[1];
    return isDomainAllowed(domain);
}
export function isDomainAllowed(domain) {
    const allowedDomains = ["gmail.com", "ukr.net", "microsoft.com"];
    return allowedDomains.includes(domain);
}
export function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return passwordRegex.test(password);
}
export function validateBirthdate(birthdate, age) {
    return birthdate < new Date() && birthdate.getFullYear() + age === new Date().getFullYear();
}
export function getAgeCategory(age) {
    if (age < 18)
        return "child";
    if (age <= 65)
        return "adult";
    return "senior";
}
export function formatEmail(email) {
    return email.trim().toLowerCase();
}
export function validateForm(data) {
    const errors = [];
    if (!validateUsername(data.username)) {
        errors.push({ id: "username", error: "Username is invalid. It must start with a capital letter and have at least 2 letters." });
    }
    if (!validateAge(data.age)) {
        errors.push({ id: "age", error: "Age must be a number between 1 and 120." });
    }
    if (getAgeCategory(data.age) === "child") {
        errors.push({ id: "age", error: "Users under 18 are not allowed." });
    }
    if (!validateEmail(data.email)) {
        errors.push({ id: "email", error: "Email format is invalid or domain is not allowed.(only gmail.com and ukr.net or microsoft.com are allowed)" });
    }
    if (!validatePassword(data.password)) {
        errors.push({ id: "password", error: "Password must be at least 4 characters long, contain at least one uppercase letter and one digit." });
    }
    if (!validatePassword(data.repeatPassword) || data.password !== data.repeatPassword) {
        errors.push({ id: "password_repeat", error: "Passwords do not match or invalid." });
    }
    if (!validateBirthdate(data.birthdate, data.age)) {
        errors.push({ id: "birthdate", error: "Birthdate does not correspond to the provided age or is invalid." });
    }
    return errors;
}
//# sourceMappingURL=validator.js.map