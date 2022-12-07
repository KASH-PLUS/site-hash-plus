var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.post("/selectCargo", function (req, res) {
    usuarioController.selectCargo(req, res);
});

router.post("/selecionarMaquinas", function (req, res) {
    usuarioController.selecionarMaquinas(req, res);
});

router.post("/obterDadosTodasMaquinas", function (req, res) {
    usuarioController.obterDadosTodasMaquinas(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/cadastrarMaquina", function (req, res) {
    usuarioController.cadastrarMaquina(req, res);
});

router.post("/cadastrarComponente", function (req, res) {
    usuarioController.cadastrarComponente(req, res);
});

router.post("/listarCaixas", function (req, res) {
    usuarioController.listarCaixas(req, res);
})

router.post("/listarQuantidade", function (req, res) {
    usuarioController.listarQuantidade(req, res);
})

router.post("/listarMaquinasRegiao", function (req, res) {
    usuarioController.listarMaquinasRegiao(req, res);
})

router.post("/verificarComponentes", function (req, res) {
    usuarioController.verificarComponentes(req, res);
})

router.post("/verificarTemperatura", function (req, res) {
    usuarioController.verificarTemperatura(req, res);
})

router.post("/enviarEmailContato", function (req, res) {
    usuarioController.enviarEmailContato(req, res);
})

router.post("/criarMapaCaixas", function (req, res) {
    usuarioController.criarMapaCaixas(req, res);
})

router.post("/deletarCaixa", function (req, res) {
    usuarioController.deletarCaixa(req, res);
})

router.post("/gerarSelect", function (req, res) {
    usuarioController.gerarSelect(req, res);
})

router.post("/listarProcessos", function (req, res) {
    usuarioController.listarProcessos(req, res);
})


module.exports = router;