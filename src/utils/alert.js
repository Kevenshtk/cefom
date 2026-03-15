import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const showSuccess = (msg) => {
  Toast.fire({
    icon: 'success',
    title: msg,
  });
};

const showError = (msg) => {
  Toast.fire({
    icon: 'warning',
    title: msg,
  });
};

const confirmDelete = async () => {
  const result = await Swal.fire({
    title: 'Deseja excluir o registro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Não, cancelar!',
  });

  return result.isConfirmed;
};

const confirmUpdate = async () => {
  const result = await Swal.fire({
    title: 'Deseja salvar as alterações?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    denyButtonText: `Não Salvar`,
    cancelButtonText: 'Cancelar',
  });

  if (result.isDenied) {
    Swal.fire('As alterações não foram salvas.', '', 'info');
  }
  
  return result;
};

const alert = {
  success: showSuccess,
  error: showError,
  delete: confirmDelete,
  update: confirmUpdate,
};

export default alert;
