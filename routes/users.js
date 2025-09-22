import { Router } from "express";
import { getAllDados, criarUser, deleteUser, getUser, editUser } from "../controllers/usersController.js";
import { authMiddleware } from "../middleware/auth.js";

const rota = Router();

//rota pra retornar os dados
rota.get('/bd', authMiddleware, getAllDados);

rota.post('/bd', authMiddleware, criarUser);

rota.get('/bd/:id', authMiddleware, getUser);

rota.put('/bd/:id', authMiddleware, editUser);

rota.delete('/bd/:id', authMiddleware, deleteUser);

export default rota;