var CORREO_DESTINO = 'jrcervantesp@unimagdalena.edu.co';
var ENDPOINT = 'https://formsubmit.co/' + CORREO_DESTINO;

function abrirModal(tipo) {
  var titulo = document.getElementById('tituloModal');
  document.getElementById('formularioRegistro').dataset.tipo = tipo;
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

function enviarCorreo(asunto, datos) {
  var cuerpo = {
    _subject: asunto,
    _template: 'table',
    _captcha: 'false'
  };
  for (var k in datos) cuerpo[k] = datos[k];
  return fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(cuerpo)
  });
}

/*
function enviarReporte(evento) {
  evento.preventDefault();
  var form = document.getElementById('formularioRegistro');
  var tipo = form.dataset.tipo || 'perdido';
  var datos = {
    Tipo: tipo === 'perdido' ? 'Objeto perdido' : 'Objeto encontrado',
    Categoria: document.getElementById('categoria').value,
    Lugar: document.getElementById('lugar').value,
    Descripcion: document.getElementById('descripcion').value,
    Fecha: new Date().toLocaleString('es-CO')
  };
  enviarCorreo('Nuevo reporte: ' + datos.Tipo, datos)
    .then(function () { alert('Reporte guardado y enviado con éxito'); })
    .catch(function () { alert('Reporte guardado (no se pudo enviar el correo)'); })
    .finally(function () { cerrarModal(); });
}
*/
function reclamar(nombre) {
  var datos = {
    Tipo: 'Solicitud de reclamo',
    Objeto: nombre,
    Fecha: new Date().toLocaleString('es-CO')
  };
  enviarCorreo('Reclamo de objeto: ' + nombre, datos)
    .then(function () { alert('Solicitud de reclamo enviada para: ' + nombre); })
    .catch(function () { alert('No se pudo enviar la solicitud, intenta más tarde'); });
}

document.getElementById('modalFondo').addEventListener('click', function (e) {
  if (e.target.id === 'modalFondo') cerrarModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') cerrarModal();
});
