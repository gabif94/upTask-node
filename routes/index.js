const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectControllers');
const {body} = require('express-validator/check');
const taskController = require('../controllers/taskController')
const userController = require('../controllers/userController')

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

	router.post('/proyects/:url', taskController.addTask)

	router.patch('/tasks/:id', taskController.changeStateTask)

	router.delete('/tasks/:id', taskController.deleteTask)

	router.get('/create-account/', userController.createAccountForm)

	return router;
};
