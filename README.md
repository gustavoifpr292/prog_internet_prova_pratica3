# 📦 Revisão da API CRUD com JWT e JSON

Este documento descreve a implementação atual da API e aponta os pontos **corretos** e os que **precisam ser ajustados/melhorados** para que o projeto fique totalmente alinhado ao enunciado.

---

## ✅ O que já está correto

- Estrutura organizada do projeto (controllers, routes, utils, middleware).
- Persistência dos dados em **arquivo JSON** (`db.json`).
- Senhas são **criptografadas** com `bcryptjs`.
- Autenticação via **JWT** implementada com expiração de **1 hora**.
- Rotas de autenticação implementadas:
  - `POST /register`
  - `POST /login`
  - `GET /profile` (rota protegida)
- Middleware de autenticação (valida o token antes de acessar rotas protegidas).
- Uso do `express.json()` para lidar com requisições JSON.

---

## ⚠️ O que precisa ser melhorado ou corrigido

### 1. **IDs de usuários**
- Atualmente, os usuários registrados em `db.json` **não possuem `id`**, mas os métodos de CRUD (`getUser`, `editUser`, `deleteUser`) dependem de `id`.  
🔧 **Correção sugerida:** adicionar um `id` ao criar/registrar usuário (usando `uuid` ou incremento numérico).

---

### 2. **Rotas de usuários**
- O enunciado pede rotas `/users` e `/users/:id`.  
- A implementação atual usa `/bd` e `/bd/:id`.  
🔧 **Correção sugerida:** renomear para:
  - `GET /users` → listar usuários
  - `POST /users` → criar usuário
  - `GET /users/:id` → buscar por ID
  - `PUT /users/:id` → atualizar
  - `DELETE /users/:id` → excluir

---

### 3. **Persistência em edição e exclusão**
- `editUser`: altera o usuário em memória, mas **não salva** no JSON.  
- `deleteUser`: usa `db.splice(element, 1)`, mas `element` é um objeto, não índice. Além disso, também não salva no JSON.  
🔧 **Correção sugerida:**
  - `editUser` deve chamar `salvarAlteracao(db)` após a alteração.
  - `deleteUser` deve usar `findIndex` e depois salvar a alteração.

---

### 4. **Consistência dos dados**
- `authController.js` trabalha com `{ username, email, password }`.  
- `usersController.js` espera `{ id }`.  
- `db.json` inicial contém usuários sem `id`.  
🔧 **Correção sugerida:** padronizar todos os registros de usuário com `id, username, email, password`.

---

### 5. **Token JWT**
- O token gerado no login contém apenas `{ username }`.  
🔧 **Correção sugerida:** incluir também `id` e `email` no payload, para facilitar consultas no `req.user`.

---

### 6. **Boas práticas**
- A chave JWT (`"ifpr"`) está hardcoded.  
🔧 **Correção sugerida:** mover para uma variável de ambiente (`process.env.JWT_SECRET`).  
- `salvarAlteracao()` em `criarUser` está sendo chamado sem parâmetro (`db`).  
🔧 **Correção sugerida:** passar `db` corretamente.  
- Melhor validar dados de entrada (`username`, `email`, `password`) para evitar registros inválidos.

---

## 📌 Próximos Passos para Ajustar
1. Adicionar campo `id` nos usuários já existentes em `db.json`.  
2. Corrigir funções `editUser` e `deleteUser` para persistirem no JSON.  
3. Alterar rotas de `/bd` para `/users`.  
4. Padronizar os objetos `User` com `{ id, username, email, password }`.  
5. Melhorar segurança movendo segredo JWT para `.env`.  

---

## 🏁 Conclusão
A base do projeto está **bem implementada**: autenticação, criptografia de senha e CRUD básico já funcionam.  
As principais melhorias são ajustes de **consistência nos dados** e **persistência correta no arquivo JSON**.  
Com esses acertos, a API ficará 100% alinhada com o enunciado da avaliação.

