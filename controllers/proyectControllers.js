const Proyects = require('../models/Proyects');
const Tasks = require('../models/Tasks')

exports.proyectHome = async (req, res) => {
	const proyects = await Proyects.findAll();
	res.render('index', {
		pageName: 'Proyects',
		proyects,
	});
};

exports.proyectForm = async (req, res) => {
	const proyects = await Proyects.findAll();
	res.render('newProyect', {
		pageName: 'New Proyect',
		proyects,
	});
};

exports.newProyect = async (req, res) => {
	const {name} = req.body;
	console.log(req.body);
	let errors = [];
	if (!name) {
		errors.push({text: 'Add a proyect name'});
	}
	if (errors.length > 0) {
		res.render('newProyect', {
			pageName: 'New Proyect',
			errors,
			proyects,
		});
	} else {
		const proyect = await Proyects.create({name});
		res.redirect('/');
	}
};

exports.proyectByUrl = async (req, res, next) => {
	const proyectsPromise = Proyects.findAll();
	const proyectPromise = Proyects.findOne({
		where: {
			url: req.params.url,
		},
	});

	const [proyects, proyect] = await Promise.all([
		proyectsPromise,
		proyectPromise,
	]);

	const tasks = await Tasks.findAll({
		where: {
			proyectId: proyect.id
		}
	})


	if (!proyect) return next();

	res.render('tasks', {
		pageName: 'Tasks',
		proyect,
		proyects,
		tasks
	});
};
exports.editProyect = async (req, res) => {
	const proyectsPromise = Proyects.findAll();
	const proyectPromise = Proyects.findOne({
		where: {
			id: req.params.id,
		},
	});

	const [proyects, proyect] = await Promise.all([
		proyectsPromise,
		proyectPromise,
	]);

	res.render('newProyect', {
		pageName: 'Edit Proyect',
		proyect,
		proyects,
	});
};

exports.updateProyect = async (req, res) => {
	const {name} = req.body;
	console.log(req.body);
	let errors = [];
	if (!name) {
		errors.push({text: 'Add a proyect name'});
	}
	if (errors.length > 0) {
		res.render('newProyect', {
			pageName: 'New Proyect',
			errors,
			proyects,
		});
	} else {
		await Proyects.update({name: name}, {where: {id: req.params.id}});
		res.redirect('/');
	}
};

exports.deleteProyect = async (req, res, next) => {
	const {urlProyect} = req.query;

	const result = await Proyects.destroy({where: {url: urlProyect}});

	if (!result) {
		return next();
	}

	res.status(200).send('Your project has been deleted.');
};
