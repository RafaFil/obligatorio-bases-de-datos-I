let express = require('express');
var router = express.Router();
const { obtenerPreguntaUsuario, verificarRespuesta, cambiarContrase├▒a } = require('../dataAccess/recuperarContrase├▒aDA');

router.get('/:user_id', async (req, res) => {
    return obtenerPreguntaUsuario(req, res);
});

router.post('/:user_id', async (req, res) => {
    return verificarRespuesta(req, res);
});

router.post('/',async (req,res) => {
    return cambiarContrase├▒a(req,res);
}) 

module.exports = router
