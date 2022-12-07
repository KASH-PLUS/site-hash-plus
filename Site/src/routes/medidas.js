var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimasCpu/:serialNumber", function (req, res) {
    medidaController.buscarUltimasMedidasCpu(req, res);
});

router.get("/ultimasCondicaoCpu/:serialNumber", function (req, res) {
    medidaController.buscarUltimasCondicaoCpu(req, res);
});

router.get("/ultimasCondicaoRam/:serialNumber", function (req, res) {
    medidaController.buscarUltimasCondicaoRam(req, res);
});

router.get("/ultimasCondicaoDisco/:serialNumber", function (req, res) {
    medidaController.buscarUltimasCondicaoDisco(req, res);
});

router.get("/ultimasOciosidade/:serialNumber", function (req, res) {
    medidaController.buscarUltimasMedidasOciosidade(req, res);
});

router.get("/tempo-realCpu/:serialNumber", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCpu(req, res);
});

router.get("/tempo-realUso/:serialNumber", function (req, res) {
    medidaController.buscarMedidasEmTempoRealTempoUso(req, res);
});

router.get("/ultimasRam/:serialNumber", function (req, res) {
    medidaController.buscarUltimasMedidasRam(req, res);
});

router.get("/tempo-realRam/:serialNumber", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRam(req, res);
});

router.get("/ultimasDisco/:serialNumber", function (req, res) {
    medidaController.buscarUltimasMedidasDisco(req, res);
});

router.get("/maxDisco/:serialNumber", function (req, res) {
    medidaController.buscarMaxDisco(req, res);
});

router.get("/maxRam/:serialNumber", function (req, res) {
    medidaController.buscarMaxRam(req, res);
});

router.get("/ultimasRede/:serialNumber", function (req, res) {
    medidaController.buscarUltimasMedidasRede(req, res);
});

router.get("/tempo-realRede/:serialNumber", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRede(req, res);
});

router.get("/tempo-realPacotes/:serialNumber", function (req, res) {
    medidaController.buscarMedidasEmTempoRealPacotes(req, res);
});

router.get("/obterDadosPlacaRede/:serialNumber", function (req, res) {
    medidaController.obterDadosPlacaRede(req, res);
});

router.get("/ultimosPacotes/:serialNumber", function (req, res) {
    medidaController.buscarUltimasMedidasPacotes(req, res);
});

router.get("/ultimasTemp/:serialNumber", function (req, res) { 
    medidaController.buscarUltimasMedidasTemp(req, res);
});

router.get("/tempo-realTemp/:serialNumber", function (req, res) {
    medidaController.buscarMedidasEmTempoRealTemp(req, res);
});

router.get("/tempo-realClock/:serialNumber", function (req, res) {
    medidaController.buscarClockEmTempoReal(req, res);
});
router.get("/ultimasProcCpu/:serialNumber", function (req, res) {
    medidaController.buscarUltimasMedidasProcCpu(req, res);
});

router.get("/tempo-realProcCpu/:serialNumber", function (req, res) {
    medidaController.buscarMedidasEmTempoRealProcCpu(req, res);
});

router.get("/ultimasProcRam/:serialNumber", function (req, res) {
    medidaController.buscarUltimasMedidasProcRam(req, res);
});

router.get("/tempo-realProcRam/:serialNumber", function (req, res) {
    medidaController.buscarMedidasEmTempoRealProcRam(req, res);
});

module.exports = router;