-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(36) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `password` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
