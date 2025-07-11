
import "./components/cliente-form.js";
import "./components/cliente-list.js";
import "./components/producto-form.js";
import "./components/producto-list.js";
import "./components/factura-form.js";
import "./components/factura-list.js";

// Función para insertar el contenido HTML de una vista
async function mostrarVista(archivo) {
  const contenedorVista = document.getElementById("vista");

  try {
    const respuesta = await fetch(`./modulos/${archivo}`);
    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
    const contenido = await respuesta.text();
    contenedorVista.innerHTML = contenido;
  } catch (error) {
    contenedorVista.innerHTML = `<div class="alert alert-danger">No se pudo cargar la vista: <strong>${archivo}</strong></div>`;
    console.error("Error al mostrar la vista:", error);
  }
}

// Asociar eventos a los botones del menú
function activarMenu() {
  const enlaces = document.querySelectorAll("[data-modulo]");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault(); // prevenir comportamiento por defecto
      const archivoVista = enlace.getAttribute("data-modulo");
      mostrarVista(archivoVista);
    });
  });
}

// Arranque de la app
document.addEventListener("DOMContentLoaded", () => {
  activarMenu();
  mostrarVista("clientes.html"); // vista inicial
});
