document.addEventListener('DOMContentLoaded', function () {
  const token = getCookie('csrftoken');

  document.querySelectorAll('.btn-toggle-estado').forEach(button => {
    button.addEventListener('click', function () {
      const userId = this.dataset.userId;
      handleAction(userId, 'toggle_estado', this);
    });
  });

  document.querySelectorAll('.btn-eliminar-usuario').forEach(button => {
    button.addEventListener('click', function () {
      const userId = this.dataset.userId;
      if (confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
        handleAction(userId, 'delete', this);
      }
    });
  });

  function handleAction(userId, action, button) {
    fetch(`/accounts/api/usuarios/${userId}/`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      body: JSON.stringify({ action }),
    })
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(({ status, body }) => {
        if (status >= 400 || !body.success) {
          alert(body.error || 'Ocurrió un error al procesar la acción.');
          return;
        }

        const row = button.closest('tr');

        if (action === 'delete') {
          row.remove();
          return;
        }

        if (action === 'toggle_estado') {
          const activoCell = row.querySelector('.usuario-activo');
          const toggleButton = row.querySelector('.btn-toggle-estado');
          activoCell.textContent = body.activo ? 'Sí' : 'No';
          toggleButton.textContent = body.activo ? 'Desactivar' : 'Activar';
          return;
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
        alert('Error de red. Intenta de nuevo.');
      });
  }
});
