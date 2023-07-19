import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { router } from "./app/router/index";

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Api corriendo por el puerto", PORT));
