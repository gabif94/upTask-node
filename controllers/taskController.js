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

exports.changeStateTask = async (req, res, next) => {
    const {id} = req.params
    const task = await Tasks.findOne({where: {id}})

    let state = 0
    if(task.state === state){
        state = 1
    }
    task.state = state

    const result = await task.save()

    if(!result) return next()
    res.status(200).send('update')
}

exports.deleteTask = async (req, res, next) => {
    // const {idTask} = req.params

    const result = await Tasks.destroy( {where: req.params})

    if(!result) return next()
    res.status(200).send('Task Delete')
}