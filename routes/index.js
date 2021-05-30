const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectControllers');

module.exports = function () {
	router.get('/', proyectController.proyectHome);
	router.get('/new-proyect', proyectController.proyectForm);
	router.post('/new-proyect', proyectController.newProyect);
	return router;
};
