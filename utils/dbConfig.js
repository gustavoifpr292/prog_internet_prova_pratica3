import fs from 'fs';

export function lerArquivo() {
    const arquivo = fs.readFileSync('/save/prova3bim/prog_internet_prova_pratica3/utils/db.json', 'utf-8');
    return JSON.parse(arquivo);
}

export function salvarAlteracao(db) {
    const alteracaoAdd = JSON.stringify(db, null, 2);

    fs.writeFileSync('/save/prova3bim/prog_internet_prova_pratica3/utils/db.json', alteracaoAdd, 'utf-8');
}