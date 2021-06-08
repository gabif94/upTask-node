const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectControllers');
const {body} = require('express-validator/check');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

module.exports = function () {
	//proyect routes
	router.get(
		'/',
		authController.userIsAutenticated,
		proyectController.proyectHome
	);
	router.get(
		'/new-proyect',
		authController.userIsAutenticated,
		proyectController.proyectForm
	);
	router.post(
		'/new-proyect',
		authController.userIsAutenticated,
		body('name').not().isEmpty().trim().escape(),
		proyectController.newProyect
	);
	router.get(
		'/proyects/:url',
		authController.userIsAutenticated,
		proyectController.proyectByUrl
	);

	router.get(
		'/proyect/edit/:id',
		authController.userIsAutenticated,
		proyectController.editProyect
	);
	router.post(
		'/new-proyect/:id',
		authController.userIsAutenticated,
		body('name').not().isEmpty().trim().escape(),
		proyectController.updateProyect
	);

	router.delete(
		'/proyects/:url',
		authController.userIsAutenticated,
		proyectController.deleteProyect
	);

	//task routes

	router.post(
		'/proyects/:url',
		authController.userIsAutenticated,
		taskController.addTask
	);

	router.patch(
		'/tasks/:id',
		authController.userIsAutenticated,
		taskController.changeStateTask
	);

	router.delete(
		'/tasks/:id',
		authController.userIsAutenticated,
		taskController.deleteTask
	);

	//user routes

	router.get('/create-account/', userController.createAccountForm);

	router.post('/create-account', userController.createAccount);

	router.get('/login', userController.logInForm);

	router.post('/login', authController.autenticateUser);

	router.get('/sign-off', authController.signOff);

	router.get('/restore-password', userController.resetPasswordForm);

	router.post('/restore-password', authController.sendToken);

	router.get('/restore-password/:token', authController.validateToken);

	router.post('/restore-password/:token', authController.updatePassword);

	return router;
};
