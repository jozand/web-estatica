function loadContent(jsonPath) {
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el archivo JSON.");
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('contenido');

      // Verificar si los datos contienen los elementos esperados
      if (data.servicios) {
        // Si es una página de servicios
        const serviciosHtml = data.servicios.map(servicio => `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
              <div class="card-body">
                <h5 class="card-title">${servicio.titulo}</h5>
                <p class="card-text">${servicio.descripcion}</p>
              </div>
            </div>
          </div>
        `).join("");

        container.innerHTML = `
          <div class="text-center mb-4">
            <h1>${data.titulo}</h1>
            <h4 class="text-muted">${data.subtitulo}</h4>
          </div>
          <div class="row">
            ${serviciosHtml}
          </div>
        `;
      } else {
        // Para las otras páginas
        container.innerHTML = `
          <div class="text-center mb-4">
            <h1>${data.titulo}</h1>
            <h4 class="text-muted">${data.subtitulo}</h4>
          </div>
          <div>
            ${data.parrafos.map(p => `<p>${p}</p>`).join("")}
          </div>
        `;
      }
    })
    .catch(error => {
      document.getElementById('contenido').innerHTML = `
        <div class="alert alert-danger">Error al cargar el contenido: ${error.message}</div>
      `;
      console.error(error);
    });
}
