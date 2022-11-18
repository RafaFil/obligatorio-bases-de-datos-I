var express = require('express');
const dummyBL  = require('../logic/dummyBL')
var router = express.Router();

router.get('/', async function(req, res, next) {
    const result = await dummyBL.obtenerTodosLosPermisos(req.headers['user-agent']);
    if (!result){
        res.status(404).json("not found");
        return;
    }
    res.status(200).json(result);
});

module.exports = router;