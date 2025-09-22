/*import { readFileSync } from 'fs';

console.log(readFileSync('./utils/db.json', 'utf-8'));
const teste = JSON.parse(readFileSync('./utils/db.json', 'utf-8'));

console.log(teste.teste);*/

import express from "express";
import dataUsers from "./routes/users.js";
import dataAuth from "./routes/auth.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

//Rota da API
app.use('/', dataUsers);
app.use('/', dataAuth);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})