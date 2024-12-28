import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { User, UserLogin, UserPassword, UserLoginSchema, UserPasswordSchema, UserSchema } from "../types/UserTypes";
import {DecodedToken} from "../types/JwtTypes";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

/**
 * Middleware to hash a user's password.
 * Replaces the password in the request body with its hashed value.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
export const Hash = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const password: UserPassword = UserPasswordSchema.parse(req.body.password);

        req.body.password = await bcrypt.hash(password, 10);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ status: 500, data: { error: 'Password hashing failed' } });
    }
};

/**
 * Controller to create a new user in the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const Create = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = UserSchema.parse(req.body);

        const { username } = await prisma.user.create({
            data: user,
            select: {
                username: true,
            }
        });

        res.status(201).send({ status: 201, data: { user: { username } } });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ status: 500, data: { error: 'User creation failed' } });
    }
};

/**
 * Middleware to verify a JWT token and retrieve user information if valid.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
export const Token = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            next();
        }
        else {
            if (process.env.JWT_SECRET) {
                const { id } = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

                const user = await prisma.user.findUnique({
                    where: {
                        id,
                    },
                    select: {
                        username: true,
                        email: true
                    }
                });

                res.status(200).send({ status: 200, data: { user } });
            }
        }
    }
    catch (error) {
        res.status(400).send({ status: 400, data: { error: 'Invalid token' } });
    }
};

/**
 * Controller to authenticate a user.
 * Validates credentials, checks the password, and returns a JWT token if authentication succeeds.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const Auth = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: UserLogin = UserLoginSchema.parse(req.body);

        const toMatch = await prisma.user.findUnique({
            where: {
                username: user.username,
            },
            select: {
                id: true,
                username: true,
                email: true,
                password: true
            }
        });

        if (!toMatch) {
            res.status(401).send({ status: 401, data: { error: 'Invalid credentials' } });
        }
        else {
            const match = await bcrypt.compare(user.password, toMatch.password);

            if (match) {
                let token;

                if (process.env.JWT_SECRET) {
                    token = jwt.sign({ id: toMatch.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
                }

                res.status(200).send({
                    status: 200,
                    data: {
                        user: {
                            username: toMatch.username,
                            email: toMatch.email,
                            token: token
                        }
                    }
                });
            }
            else {
                res.status(403).send({ status: 403, data: { error: 'Wrong password' } });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ status: 500, data: { error: 'Internal server error' } });
    }
};