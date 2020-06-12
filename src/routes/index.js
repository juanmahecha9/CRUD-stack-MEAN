const express = require('express'),
    control = require('../controllers/controller');

const router = express.Router(); //configurar las rutas que se van a usar

//Crear la ruta para el control Crear datos y llamar la funcion en especifico de ese documento
router.post('/new', control.createData);
//obtner o mostrar los datos de la BD
router.get('/data', control.showData);
//actualizar datos de la BD
router.put('/actualizar/:id', control.upgradeData);
//eliminar datos de la Db
router.delete('/borrar/:id', control.delateData);
router.delete('/todo', control.dropAll);

module.exports = router;
//exportar las rutas