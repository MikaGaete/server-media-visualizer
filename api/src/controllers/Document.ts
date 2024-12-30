import {Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';
import jwt from "jsonwebtoken";
import {DecodedToken} from "../types/JwtTypes";
import * as fs from "node:fs";

const prisma = new PrismaClient();

export const GetAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization;
        const {take} = req.params;

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }
        else if (process.env.JWT_SECRET && token) {
            const {id} = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
            const documents = await prisma.file.findMany({
                where: {
                    image: false,
                    userId: id
                },
                select: {
                    id: true,
                    image: false,
                    name: true
                },
                take: Number(take)
            });
            const refinedDocuments = [];

            for (const document of documents) {
                refinedDocuments.push({
                    id: document.id,
                    name: document.name,
                    path: `https://docs.mikael.cl/${document.id}`
                });
            }

            res.status(200).send({ status: 200, data: { documents: refinedDocuments } });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error getting documents", error });
    }
}

export const Get = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization;
        const {documentId} = req.params;

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }
        else if (!documentId) {
            res.status(400).send({ message: "No image ID provided" });
        }
        else if (process.env.JWT_SECRET && token) {
            const {id} = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
            const document = await prisma.file.findUnique({
                where: {
                    id: documentId,
                    image: false,
                    userId: id
                },
                select: {
                    id: true,
                    name: true
                }
            });

            const refinedDocument = {
                id: document?.id,
                name: document?.name,
                url: `https://docs.mikael.cl/${document?.id}`
            }

            res.status(200).send({ status: 200, data: { document: refinedDocument } });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error getting image", error });
    }
}

export const EditName = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization;
        const {name, documentId} = req.body;

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }
        else if (!documentId) {
            res.status(400).send({ message: "No image ID provided" });
        }
        else if (process.env.JWT_SECRET && token) {
            const {id} = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

            await prisma.file.update({
                where: {
                    id: documentId,
                    image: false,
                    userId: id
                },
                data: {
                    name
                }
            });

            res.status(200).send({ status: 200, data: { message: "Image name updated" } });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error updating image name", error });
    }
}

export const Delete = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization;
        const {documentId} = req.body;

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }
        else if (!documentId) {
            res.status(400).send({ message: "No image ID provided" });
        }
        else if (process.env.JWT_SECRET && token) {
            const {id} = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

            fs.unlink(`${process.env.MEDIA_FOLDER}/${documentId}`, async (err) => {
                if (err) {
                    return res.status(500).send({ message: "Error deleting file", error: err });
                }
                else {
                    await prisma.file.delete({
                        where: {
                            id: documentId,
                            image: false,
                            userId: id
                        }
                    });

                    res.status(200).send({ status: 200, data: { message: "File deleted successfully" } });
                }
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error deleting file", error });
    }
}