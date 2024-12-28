import * as z from "zod";

/**
 * Zod schema to validate user creation data.
 * Ensures that:
 * - `username` is a string with a minimum length of 3.
 * - `email` is a valid email address.
 * - `password` is a string with a minimum length of 60 (assumed to be a hashed password).
 */
export const UserSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(60),
});

/**
 * Zod schema to validate user login data.
 * Ensures that:
 * - `username` is a string with a minimum length of 3.
 * - `password` is a string with a minimum length of 8.
 */
export const UserLoginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
});

/**
 * Zod schema to validate raw user passwords.
 * Ensures that:
 * - The password is a string with a length between 8 and 32 characters.
 * - The password contains at least one digit.
 * - The password contains at least one special character.
 */
export const UserPasswordSchema = z.string()
    .min(8)
    .max(32)
    .regex(/^(?=.*\d).+$/) // At least one digit
    .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/); // At least one special character

/**
 * Type representing a user, inferred from the `UserSchema`.
 */
export type User = z.infer<typeof UserSchema>;

/**
 * Type representing user login data, inferred from the `UserLoginSchema`.
 */
export type UserLogin = z.infer<typeof UserLoginSchema>;

/**
 * Type representing a raw user password, inferred from the `UserPasswordSchema`.
 */
export type UserPassword = z.infer<typeof UserPasswordSchema>;