const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectControllers');
const {body} = require('express-validator/check');

module.exports = function () {
	router.get('/', proyectController.proyectHome);
	router.get('/new-proyect', proyectController.proyectForm);
	router.post(
		'/new-proyect',
		body('name').not().isEmpty().trim().escape(),
		proyectController.newProyect
	);
	router.get('/proyects/:url', proyectController.proyectByUrl);

	router.get('/proyect/edit/:id', proyectController.editProyect);
	router.post(
		'/new-proyect/:id',
		body('name').not().isEmpty().trim().escape(),
		proyectController.updateProyect
	);

	router.delete('/proyects/:url', proyectController.deleteProyect);

	return router;
};
