import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { lerArquivo, salvarAlteracao } from "../utils/dbConfig.js";

export async function registrarUsuario(req, res) {
    try {
        const {username, email, password} = req.body;
        const db = lerArquivo();

        for (const pessoa in db) {
            const user = db[pessoa];
            if (user.username === username) return res.status(400).json({ message: "Usuário já existe" });
            if (user.email === email) return res.status(400).json({ message: "Email já está cadastrado" });
        }
        /*console.log(db);
        const user = db.find(element => element.username === username);

        if (!user) return res.status(400).json({ message: "Email já está cadastrado" });
        /*db.forEach(element => {
           if (element.username === username) return res.status(400).json({ message: "Usuário já existe" });
           if (element.email === email) return res.status(400).json({ message: "Email já está cadastrado" });
        });*/

        const hashPassword = await bcrypt.hash(password, 10);

        const novoUsuario = {username, email, password: hashPassword};

        db.push(novoUsuario);

        salvarAlteracao(db);

        res.json({message:"Usuário registrado com sucesso."});
    } catch (err) {
        res.status(500).json({message:"Erro ao registrar usuario"});
        console.error(err);
    }
}

export async function logarUsuario(req, res) {
  try {
    const {username, password} = req.body;
    const db = lerArquivo();
    
    let user;
    db.forEach(element => {
        if (element.username === username) user = element;
    });

    if (!user) return res.status(400).json({ message: "Usuário não existe" });
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return res.status(400).json({message: "Senha incorreta"});
    }

    const token = jwt.sign({username}, "ifpr", {expiresIn:"1h"});
    res.json({token});
  } catch(err) {
    res.status(500).json({message:"Erro ao logar usuario"});
    console.error(err);
  }
}