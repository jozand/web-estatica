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

      // Después de insertar el menú, marcamos el enlace activo
      marcarEnlaceActivo();
    })
    .catch(error => {
      console.error("Error al cargar el menú:", error);
    });
}

// Función para marcar el enlace activo según la página actual
function marcarEnlaceActivo() {
  const links = document.querySelectorAll('.navbar-nav .nav-link');
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === current || (href === "index.html" && current === "")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Cargar el menú cuando se carga la página
loadMenu();
