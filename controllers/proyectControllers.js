const Proyects = require('../models/Proyects');

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
	const proyects = await Proyects.findAll();
	const {url} = req.params;
	const proyect = await Proyects.findOne({
		where: {
			url,
		},
	});
	if (!proyect) return next();

	res.render('tasks', {
		pageName: 'Tasks',
		proyect,
		proyects,
	});
};
