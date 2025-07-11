import "./components/cliente-form.js";
import "./components/cliente-list.js";
import "./components/producto-form.js";
import "./components/producto-list.js";
import "./components/factura-form.js";
import "./components/factura-list.js";

async function cargarModulo(ruta) {
  const contenedor = document.querySelector("#vista");

  try {
    const respuesta = await fetch(`./modulos/${ruta}`);
    if (!respuesta.ok) throw new Error(`Estado HTTP: ${respuesta.status}`);
    const html = await respuesta.text();
    contenedor.innerHTML = html;
  } catch (ex) {
    contenedor.innerHTML = `
      <div class="alert alert-warning" role="alert">
        No fue posible mostrar el contenido: <em>${ruta}</em>
      </div>`;
    console.warn("Fallo al cargar el módulo:", ex);
  }
}


function configurarNavegacion() {
  const items = document.querySelectorAll("[data-modulo]");
  for (const item of items) {
    item.addEventListener("click", (evento) => {
      evento.preventDefault();
      const rutaVista = item.dataset.modulo;
      cargarModulo(rutaVista);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  configurarNavegacion();
  cargarModulo("clientes.html"); 
});
