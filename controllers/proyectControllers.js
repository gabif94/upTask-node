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
	const proyectsPromise =  Proyects.findAll();
	const proyectPromise =  Proyects.findOne({
		where: {
			url: req.params.url
		}
	})

	const [proyects, proyect] = await Promise.all([proyectsPromise, proyectPromise])
	if (!proyect) return next();

	res.render('tasks', {
		pageName: 'Tasks',
		proyect,
		proyects,
	});
};
exports.editProyect = async (req, res) => {
	const proyectsPromise =  Proyects.findAll();
	const proyectPromise =  Proyects.findOne({
		where: {
			id: req.params.id
		}
	})

	const [proyects, proyect] = await Promise.all([proyectsPromise, proyectPromise])


	res.render('newProyect',{
		pageName: 'Edit Proyect',
		proyects,
		proyect
	})
}