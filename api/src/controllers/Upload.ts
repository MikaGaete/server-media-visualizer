import {Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';
import {DecodedToken} from "../types/JwtTypes";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const Images = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization;
        const files = req.files as Express.Multer.File[];

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }
        else if (!files || files.length === 0) {
            res.status(400).send({ message: "No files uploaded" });
        }
        else if (process.env.JWT_SECRET && token) {
            const { id } = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

            for (const file of files) {
                const { originalname, filename, path, size } = file;

                await prisma.file.create({
                    data: {
                        id: filename,
                        name: originalname,
                        path,
                        size,
                        image: true,
                        userId: id,
                    }
                });
            }

            res.status(200).send({ status: 200, message: "Files uploaded" });
        }
        else throw new Error("No JWT secret");
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error uploading files", error });
    }
}

export const Docs = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization;
        const files = req.files as Express.Multer.File[];

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }
        else if (!files || files.length === 0) {
            res.status(400).send({ message: "No files uploaded" });
        }
        else if (process.env.JWT_SECRET && token) {
            const { id } = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

            for (const file of files) {
                const { originalname, filename, path, size } = file;

                await prisma.file.create({
                    data: {
                        id: filename,
                        name: originalname,
                        path,
                        size,
                        image: false,
                        userId: id,
                    }
                });
            }

            res.status(200).send({ status: 200, message: "Files uploaded" });
        }
        else throw new Error("No JWT secret");
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error uploading files", error });
    }
}