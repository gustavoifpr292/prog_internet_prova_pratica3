import { lerArquivo, salvarAlteracao } from "../utils/dbConfig.js";

export async function getAllDados(req, res) {
    const db = lerArquivo();
    res.json(db);
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const db = lerArquivo();

    const user = db.find(element => element.id === id);

    if (!user) return res.status(404).json({ error: "Usuário não existe" });

    res.json(user);
  } catch(err) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
}

export async function editUser(req, res) {
  try {
    const { id } = req.params;
    const user = req.body;
    const db = lerArquivo();

    if (!user) return res.status(400).json({ error: "Dados inválidos" });

    let userDb = db.find(element => element.id === id);

    userDb = {...userDb, ...user};

    res.status(201).json({ success: true, userDb });
  } catch(err) {
    res.status(500).json({ error: "Erro ao editar usuário" });
  }
}

export async function criarUser(req, res) {
  try {
    const user = req.body;
    const db = lerArquivo();

    if (!user) return res.status(400).json({ error: "Dados inválidos" });

    const userDb = {...user, id: getId()};
    db.push(userDb);
    salvarAlteracao();
    res.status(201).json({ success: true, userDb});
  } catch(err) {
    console.error(err);
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const db = lerArquivo();

    db.forEach(element => {
        if (element.id === id) db.splice(element, 1);
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
}

export function getId() {
    const db = lerArquivo();

    let maiorId = 0;

    for (const index in db) {
        const user = db[index];

        if (user.id > maiorId) maiorId = user.id;
    }

    return maiorId+1;
}