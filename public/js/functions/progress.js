import Swal from 'sweetalert2'

export const updateProgress = () => {
    const tasks = document.querySelectorAll('li.tarea')

    console.log(tasks)

    if(tasks.length) {
        const completeTasks = document.querySelectorAll('.completo')

        const progress = Math.round((completeTasks.length / tasks.length) * 100)

        const percentege = document.querySelector('#porcentaje')

        percentege.style.width = progress+"%"

        if(progress === 100) {
            Swal.fire(
                'Project Complete',
                'Congrats, tasks complete',
                'success'
            )
        }


    }
}