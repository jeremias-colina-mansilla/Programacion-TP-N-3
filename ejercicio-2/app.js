// Lista predefinida
const palabras = ["manzana", "banana", "pera", "durazno", "frutilla", "mango"];

const lista = document.getElementById("lista-palabras");
const formulario = document.getElementById("formulario");
const filtroInput = document.getElementById("filtro");
const mensaje = document.getElementById("mensaje");

// Mostrar palabras
function mostrarPalabras(palabrasFiltradas) {
  lista.innerHTML = "";
  if (palabrasFiltradas.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No se encontraron resultados.";
    li.style.color = "gray";
    lista.appendChild(li);
  } else {
    palabrasFiltradas.forEach(palabra => {
      const li = document.createElement("li");
      li.textContent = palabra;
      lista.appendChild(li);
    });
  }
}

mostrarPalabras(palabras);


formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const texto = filtroInput.value.trim().toLowerCase();

  if (texto === "") {
    mensaje.textContent = " Por favor ingrese una palabra para filtrar.";
    mostrarPalabras(palabras);
    return;
  }

  mensaje.textContent = "";

  const resultado = palabras.filter(p => p.toLowerCase().includes(texto));
  mostrarPalabras(resultado);
});
