export interface FormData {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    age: number;
    birthdate: Date;
    subscription: subscriptionType;
}
export interface UserData {
    username: string;
    email: string;
    age: number;
    birthdate: Date;
    subscription: subscriptionType;
}
export interface FormElement {
    id: string;
    element: HTMLInputElement | null;
}
export interface Error {
    id: string;
    error: string;
}
export type subscriptionType = "free" | "paid";
export type ValidationResult = "ok" | "error";
export type AgeCategory = "child" | "adult" | "senior";
export type AllowedEmailDomain = "gmail.com" | "ukr.net" | "microsoft.com";
export type FormField = keyof FormData;
//# sourceMappingURL=types.d.ts.map