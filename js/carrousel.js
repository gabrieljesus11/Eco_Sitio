let posicionActual = 1;

function cambiarImagen(direccion) {
  const carrusel = document.querySelector('.carrusel ul');
  const imagenes = document.querySelectorAll('.carrusel li');
  const cantidadImagenes = imagenes.length;

  if (direccion === 1 && posicionActual < cantidadImagenes) {
    posicionActual++;
  } else if (direccion === -1 && posicionActual > 1) {
    posicionActual--;
  }

  const desplazamiento = -(posicionActual - 1) * 100 + '%';
  carrusel.style.transform = 'translateX(' + desplazamiento + ')';
}