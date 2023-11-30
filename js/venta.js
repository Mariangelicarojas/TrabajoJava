document.addEventListener("DOMContentLoaded", function () {
  obtenerDatos();
});
function obtenerDatos() {
  const cantidadInput = document.getElementById("cantidad");
  const categoriaSelect = document.getElementById("categoria");
  const totalAmount = document.getElementById("total-amount");
  cantidadInput.addEventListener("input", () => {
    calcularTotal(cantidadInput, categoriaSelect, totalAmount);
  });
  categoriaSelect.addEventListener("input", () => {
    calcularTotal(cantidadInput, categoriaSelect, totalAmount);
  });
  calcularTotal(cantidadInput, categoriaSelect, totalAmount);
}
function calcularTotal(cantidadInput, categoriaSelect, totalAmount) {
  const cantidad = parseInt(cantidadInput.value);
  const categoria = categoriaSelect.value;
  const preciosBase = {
    Estudiante: 200,
    Trainee: 200,
    Junior: 200,
  };
  const descuentos = {
    Estudiante: 0.2,
    Trainee: 0.5,
    Junior: 0.85,
  };
  // Verificar si cantidad y categoría son valores válidos
  if (!isNaN(cantidad) && preciosBase[categoria] && descuentos[categoria]) {
    const precioBase = preciosBase[categoria];
    const descuento = descuentos[categoria];
    const precioTotal = cantidad * precioBase * descuento;
    totalAmount.textContent = "$" + precioTotal.toFixed(2);
  } else {
    // Si los valores no son válidos,que seria al comienzo muestre 0
    totalAmount.textContent = "$0,00";
  }
}
function descuento(categoria) {
  documentValue("categoria", categoria);
  documentValue("cantidad", "1");
  obtenerDatos();
}

const borrarButton = document
  .getElementById("borrar-button")
  .addEventListener("click", function () {
    document.getElementById("total-amount").textContent = "$0.00";
    documentValue("nombre", "");
    documentValue("apellido", "");
    documentValue("correo", "");
    documentValue("cantidad", "");
    documentValue("categoria", "");
  });
function documentValue(id, value) {
  document.getElementById(id).value = value;
}
