const Proyects = require('../models/Proyects')
const Tasks = require('../models/Tasks')

exports.addTask = async (req, res, next) => {
    const proyect = await Proyects.findOne({
        where: {url: req.params.url}
    })

    const {task} = req.body

    const state = 0
    const proyectId = proyect.id

    const result = await Tasks.create({task, state, proyectId})

    if(!result) {
        return next()
    }

    res.redirect(`/proyects/${req.params.url}`)

}