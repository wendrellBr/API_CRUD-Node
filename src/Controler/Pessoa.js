import { openDb } from "../configDB.js";

const db = await openDb();

export async function createTable() {
  try {
    await db.exec(`CREATE TABLE IF NOT EXISTS pessoa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      idade INTEGER NOT NULL
    )`);
    console.log("Tabela pessoa criada com sucesso.");
  } catch (error) {
    console.error("Erro ao criar tabela pessoa:", error);
    throw new Error("Erro ao criar tabela pessoa");
  }
}

export async function insertPessoa(req, res) {
  let pessoa = req.body;
  try {
    if (!pessoa.nome || !pessoa.idade) {
      throw new Error("Nome e idade são campos obrigatórios.");
    }
    await db.run(`INSERT INTO pessoa (nome, idade) VALUES (?, ?)`, [
      pessoa.nome,
      pessoa.idade,
    ]);
    res.json({ status: 200 });
    console.log("Pessoa inserida com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir pessoa:", error);
    throw new Error("Erro ao inserir pessoa");
  }
}

export async function updatePessoa(req, res) {
  let pessoa = req.body;
  try {
    if (!pessoa.id || !pessoa.nome || !pessoa.idade) {
      throw new Error("ID, nome e idade são campos obrigatórios.");
    }
    await db.run(`UPDATE pessoa SET nome = ?, idade = ? WHERE id = ?`, [
      pessoa.nome,
      pessoa.idade,
      pessoa.id,
    ]);
    res.json({ status: 200 });
    console.log("Pessoa atualizada com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
    throw new Error("Erro ao atualizar pessoa");
  }
}

export async function deletePessoa(req, res) {
  let id = req.query.id;
  try {
    if (!id) {
      throw new Error("ID é um campo obrigatório.");
    }
    await db.run(`DELETE FROM pessoa WHERE id = ?`, [id]);
    res.json({ status: 200 });
    console.log("Pessoa deletada com sucesso.");
  } catch (error) {
    console.error("Erro ao deletar pessoa:", error);
    throw new Error("Erro ao deletar pessoa");
  }
}

export async function selectPessoas(req, res) {
  try {
    const pessoas = await db.all(`SELECT * FROM pessoa`);
    console.log("Seleção de todas as pessoas realizada com sucesso.");
    res.json({ pessoas });
  } catch (error) {
    console.error("Erro ao buscar todas as pessoas:", error);
    throw new Error("Erro ao buscar todas as pessoas");
  }
}

export async function selectPessoa(req, res) {
  let id = req.query.id;
  try {
    if (!id) {
      throw new Error("ID é um campo obrigatório.");
    }
    const pessoa = await db.get(`SELECT * FROM pessoa WHERE id = ?`, [id]);
    console.log("Seleção de pessoa por ID realizada com sucesso.");
    res.json({ pessoa });
  } catch (error) {
    console.error("Erro ao buscar pessoa por ID:", error);
    throw new Error("Erro ao buscar pessoa por ID");
  }
}
