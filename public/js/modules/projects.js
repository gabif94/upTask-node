import Swal from 'sweetalert2';
import axios from 'axios';

const btnDelete = document.querySelector('#eliminar-proyecto');

if (btnDelete) {
	btnDelete.addEventListener('click', e => {
		const urlProyect = e.target.dataset.proyectUrl;

		// console.log(urlProyect);
		Swal.fire({
			title: 'Do you want to delete this project?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then(result => {
			if (result.isConfirmed) {
				const url = `${location.origin}/proyects/${urlProyect}`;

				axios
					.delete(url, {
						params: {urlProyect},
					})
					.then(res => {
						console.log(res);
						Swal.fire('Deleted!', res.data, 'success');
						setTimeout(() => {
							window.location.href = '/';
						}, 2000);
					})
					.catch(() => {
						Swal.fire({
							type: 'error',
							title: 'There was a mistake',
							text: 'Could not delete project',
						});
					});
			}
		});
	});
}

export default btnDelete;
