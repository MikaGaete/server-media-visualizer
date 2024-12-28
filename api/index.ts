import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

if (!process.env.PORT) {
    console.log("No PORT found in .env");
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT ?? 2506, () => {
    console.log(`Server listening on port ${process.env.PORT ?? 2506}`);
});