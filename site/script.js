function abrirModal(tipo) {
  var titulo = document.getElementById('tituloModal');
  if (tipo === 'perdido') {
    titulo.textContent = 'Reportar Objeto Perdido';
  } else {
    titulo.textContent = 'Reportar Objeto Encontrado';
  }
  document.getElementById('modalFondo').classList.add('activo');
}

function cerrarModal() {
  document.getElementById('modalFondo').classList.remove('activo');
  document.getElementById('formularioRegistro').reset();
}

function enviarReporte(evento) {
  evento.preventDefault();
  alert('Reporte guardado con éxito');
  cerrarModal();
}

function reclamar(nombre) {
  alert('Solicitud de reclamo enviada para: ' + nombre);
}

document.getElementById('modalFondo').addEventListener('click', function(e) {
  if (e.target.id === 'modalFondo') {
    cerrarModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    cerrarModal();
  }
});
