import { Router } from "express";
import {
  createTable,
  insertPessoa,
  selectPessoas,
  selectPessoa,
  updatePessoa,
  deletePessoa,
} from "./Controler/Pessoa.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    message: "API rodando",
  });
});

router.route("/pessoas").get(selectPessoas);

router
  .route("/pessoa")
  .get(selectPessoa)
  .post(insertPessoa)
  .put(updatePessoa)
  .delete(deletePessoa);

export default router;
