document.addEventListener('DOMContentLoaded', function () {
  const btnVerUsuariosCreados = document.getElementById('btnVerUsuariosCreados');
  if (btnVerUsuariosCreados) {
    btnVerUsuariosCreados.addEventListener('click', function () {
      window.location.href = '/usuarios/creados/';
    });
  }
});
