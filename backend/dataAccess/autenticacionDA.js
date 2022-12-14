const db = require('../db/conn');
const pool = db.pool;
const bcrypt = require("bcrypt");

async function esUsuarioValido(user_id, password) {
    let queryResult;
    try {
        const query = {
            sql: `SELECT PERSONAS.hashpwd FROM PERSONAS WHERE PERSONAS.user_id = ?;`,
            values: [user_id]
        }
        queryResult = await pool.query(query);
    }
    catch (err) {
        console.error(err);
        throw err;
    }

    // No existe usuario con ese ID
    if (queryResult[0].length === 0) {
        return false;
    }
    else {
        const result = bcrypt.compareSync(password, queryResult[0][0].hashpwd, function (err, result) {
            return result;
        });
        return result;
    }

}

async function usuarioPermitido(user_id, rol_neg_solicitado, app_id_solicitado) {
    let queryResult;
    try {
        const query = {
            sql: `SELECT PERMISOS.estado FROM PERMISOS WHERE 
        PERMISOS.user_id = ? AND
        PERMISOS.app_id = ? AND
        PERMISOS.rol_neg_id = ?;
        `,
            values: [user_id, app_id_solicitado, rol_neg_solicitado]
        }
        queryResult = await pool.query(query);
    }
    catch (err) {
        console.error(err);
        throw err;
    }

    //No encuentra persona con ese permiso
    if (queryResult[0].length === 0) {
        return false;
    }
    // El estado del permiso es DENEGADO o PENDIENTE
    else if (queryResult[0][0].estado !== 'AUTORIZADO') {
        return false;
    }
    //El estado del permiso debe ser entonces AUTORIZADO
    else {
        return true;
    }
}

module.exports = {
    esUsuarioValido,
    usuarioPermitido
}