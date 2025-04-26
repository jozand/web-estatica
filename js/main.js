// Función para cargar el contenido del menú desde menu.html
function loadMenu() {
  fetch('components/menu.html')
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el archivo del menú.");
      return response.text();
    })
    .then(data => {
      // Insertamos el contenido del menú en el contenedor de menú
      document.getElementById('menu-container').innerHTML = data;
    })
    .catch(error => {
      console.error("Error al cargar el menú:", error);
    });
}

// Llamamos a la función para cargar el menú cuando se carga la página
loadMenu();
