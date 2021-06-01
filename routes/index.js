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
	return router;
};
