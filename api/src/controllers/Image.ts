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
            const images = await prisma.file.findMany({
                where: {
                    image: true,
                    userId: id
                },
                select: {
                    id: true,
                    name: true
                },
                take: Number(take)
            });
            const refinedImages = [];

            console.log(images)

            for (const image of images) {
                refinedImages.push({
                    id: image.id,
                    name: image.name,
                    path: `https://images.mikael.cl/${image.id}`
                });
            }

            console.log(refinedImages);

            res.status(200).send({ status: 200, data: { images: refinedImages } });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error getting images", error });
    }
}

export const Get = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization;
        const {imageId} = req.params;

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }
        else if (!imageId) {
            res.status(400).send({ message: "No image ID provided" });
        }
        else if (process.env.JWT_SECRET && token) {
            const {id} = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
            const image = await prisma.file.findUnique({
                where: {
                    id: imageId,
                    image: true,
                    userId: id
                },
                select: {
                    id: true,
                    name: true
                }
            });

            const refinedImage = {
                id: image?.id,
                name: image?.name,
                url: `https://images.mikael.cl/${image?.id}`
            }

            res.status(200).send({ status: 200, data: { image: refinedImage } });
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
        const {name, imageId} = req.body;

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }
        else if (!imageId) {
            res.status(400).send({ message: "No image ID provided" });
        }
        else if (process.env.JWT_SECRET && token) {
            const {id} = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

            await prisma.file.update({
                where: {
                    id: imageId,
                    image: true,
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
        const {imageId} = req.body;

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }
        else if (!imageId) {
            res.status(400).send({ message: "No image ID provided" });
        }
        else if (process.env.JWT_SECRET && token) {
            const {id} = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

            fs.unlink(`${process.env.MEDIA_FOLDER}/${imageId}`, async (err) => {
                if (err) {
                    return res.status(500).send({ message: "Error deleting file", error: err });
                }
                else {
                    await prisma.file.delete({
                        where: {
                            id: imageId,
                            image: true,
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