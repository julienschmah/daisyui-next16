export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
    return password.length >= 8;
}
