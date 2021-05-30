exports.proyectHome = (req, res) => {
	res.render('index', {
		pageName: 'Proyects',
	});
};

exports.proyectForm = (req, res) => {
	res.render('newProyect', {
		pageName: 'New Proyect',
	});
};

exports.newProyect = (req, res) => {
	const {name} = req.body;
	let errors = [];
	if (!name) {
		errors.push({text: 'Add a proyect name'});
	}
	if (errors.length > 0) {
		res.render('newProyect', {
			pageName: 'New Proyect',
			errors,
		});
	}
};
