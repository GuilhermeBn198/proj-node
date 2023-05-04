import express from "express";
import { curso } from "../models/index.js";
import { CursoController } from "../controller/curso.controller.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

const cursoController = new CursoController(curso);

router.get("/", async (req, res) => {
    //get todos os cursos
    const cursos = await cursoController.getAll();
    res.json(cursos);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params; //get curso específico
    const curso = await cursoController.getById(id);
    if (curso) {
        res.json(curso);
        console.log(curso);
    } else {
        res.status(404).json({
            message: "Curso não encontrado aaaaaaaaaaaaaa",
        });
    }
});

router.post(
    "/create",
    [
        //validação dos dados
        body("nome")
            .notEmpty()
            .trim()
            .withMessage("O campo nome é obrigatório"),
        body("ch")
            .isNumeric()
            .isLength({ min: 2 })
            .withMessage("O campo ch deve ser numérico apenas"),
    ],
    async (req, res) => {
        // caso encontre erros, ficará nessa variável errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //se os dados forem válidos, o sistema executará aqui
        const { nome, ch } = req.body;
        await cursoController.adicionar({ nome, ch });
        res.status(201).json({ message: "Curso criado com sucesso!" });
    }
);

router.delete(
    "/delete/:id",
    [
        //validação dos dados
        body("id"),
        // .isNumeric()
        // .withMessage("o campo id tem que ser numérico")
        // .notEmpty()
        // .withMessage("O campo id é obrigatório"),
    ],
    async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array });
        }

        //se os dados forem válidos, o sistema executará aqui
        const id = parseInt(req.params.id); // convertendo o valor do parâmetro "id" para um número inteiro
        await cursoController.delete(id);
        res.status(200).json({ message: "Curso excluido com sucesso!" });
    }
);

router.put(
    "/update/:id",
    [
        //validação dos dados
        body("nome")
            .notEmpty()
            .trim()
            .withMessage("O campo nome é obrigatório"),
        body("ch")
            .isNumeric()
            .isLength({ min: 2 })
            .withMessage("O campo ch deve ser numérico apenas"),
    ],
    async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array });
        }

        //se os dados forem válidos, o sistema executará aqui
        const { nome, ch } = req.body;
        const id = parseInt(req.params.id); // convertendo o valor do parâmetro "id" para um número inteiro
        await cursoController.update(id, nome, ch);
        res.status(200).json({ message: "Curso alterado com sucesso!" });
    }
);

export default router;
