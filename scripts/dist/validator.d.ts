import { AgeCategory, FormData, Error, AllowedEmailDomain } from "./types.js";
export declare function validateUsername(name: string): boolean;
export declare function validateAge(age: number): boolean;
export declare function validateEmail(email: string): boolean;
export declare function isDomainAllowed(domain: string): domain is AllowedEmailDomain;
export declare function validatePassword(password: string): boolean;
export declare function validateBirthdate(birthdate: Date, age: number): boolean;
export declare function getAgeCategory(age: number): AgeCategory;
export declare function formatEmail(email: string): string;
export declare function validateForm(data: FormData): Error[];
//# sourceMappingURL=validator.d.ts.map