import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({message: "Token não fornecido"})

    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, "ifpr");
        req.user = decode;
        next();
    } catch (err) {
        res.status(401).json({message: "Token inválido ou expirado"})
    }
}