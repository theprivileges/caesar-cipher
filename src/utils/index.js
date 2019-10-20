/* @flow */
export const upper = (delta: number) => (letter: string) => String.fromCharCode((letter.charCodeAt(0) + delta - 65) % 26 + 65);
export const lower = (delta: number) => (letter: string) => String.fromCharCode((letter.charCodeAt(0) + delta - 97) % 26 + 97);
export const encrypt = (text: string, delta: number) => text.replace(/[A-Z]/g, upper(delta)).replace(/[a-z]/g, lower(delta));