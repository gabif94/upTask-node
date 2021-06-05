import axios from 'axios'
import Swal from 'sweetalert2'
import {updateProgress} from '../functions/progress'

const tasks = document.querySelector('.listado-pendientes')

if (tasks){
    tasks.addEventListener('click', (e) => {
        if(e.target.classList.contains('fa-check-circle')){
            const icon = e.target
            const idTask = icon.parentElement.parentElement.dataset.task

            const url = `${location.origin}/tasks/${idTask}`

            axios.patch(url, {idTask}).then(response => {
                if(response.status === 200) {
                    icon.classList.toggle('completo')

                    updateProgress()
                }
            })
        }
        if(e.target.classList.contains('fa-trash')){
            const taskHTML = e.target.parentElement.parentElement,
            idTask = taskHTML.dataset.task

            Swal.fire({
                title: 'Do you want to delete this task?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then(result => {
                if (result.isConfirmed) {
                    const url = `${location.origin}/tasks/${idTask}`

                    axios.delete(url, {params: {idTask}})
                    .then(response => {
                        taskHTML.parentElement.removeChild(taskHTML)

                        Swal.fire(
                            'Task Delete',
                            response.data,
                            'success'
                        )
                        updateProgress()
                    })
                }
            })
        }
    })
}

export default tasks