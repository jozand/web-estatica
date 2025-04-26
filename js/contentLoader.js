function loadContent(jsonPath) {
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el archivo JSON.");
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('contenido');
      let html = `
        <div class="text-center mb-5">
          <h1>${data.titulo}</h1>
          <h4 class="text-muted">${data.subtitulo}</h4>
        </div>
      `;

      const isServiciosPage = window.location.pathname.includes("servicios.html");

      // Si estamos en la página de servicios
      if (isServiciosPage && data.servicios && Array.isArray(data.servicios)) {
        const serviciosHtml = data.servicios.map(servicio => `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <img src="${servicio.imagen}" class="card-img-top servicio-img" alt="${servicio.titulo}">
              <div class="card-body">
                <h5 class="card-title">${servicio.titulo}</h5>
                <p class="card-text">${servicio.descripcion}</p>
              </div>
            </div>
          </div>
        `).join("");
      
        html += `<div class="row">${serviciosHtml}</div>`;
      }
      
      // Si es otra página (por ejemplo inicio)
      else {
        // Carrusel
        if (data.carousel && Array.isArray(data.carousel)) {
          html += `
            <div id="carouselInicio" class="carousel slide carousel-fade mb-5" data-bs-ride="carousel">
              <div class="carousel-inner">
                ${data.carousel.map((item, index) => `
                  <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${item.src}" class="d-block w-100 carousel-img" alt="${item.alt}">
                  </div>
                `).join("")}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselInicio" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselInicio" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          `;
        }

        // Párrafos
        if (data.parrafos && Array.isArray(data.parrafos)) {
          html += `<div class="mb-5">${data.parrafos.map(p => `<p>${p}</p>`).join("")}</div>`;
        }

        // Servicios destacados
        if (data.serviciosDestacados && Array.isArray(data.serviciosDestacados)) {
          const destacados = data.serviciosDestacados.map(servicio => `
            <div class="col-md-4 mb-4">
              <div class="card h-100 shadow-sm">
                <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.titulo}">
                <div class="card-body">
                  <h5 class="card-title">${servicio.titulo}</h5>
                  <p class="card-text">${servicio.descripcion}</p>
                </div>
              </div>
            </div>
          `).join("");

          html += `<div class="row">${destacados}</div>`;
        }
      }

      container.innerHTML = html;
    })
    .catch(error => {
      document.getElementById('contenido').innerHTML = `
        <div class="alert alert-danger">Error al cargar el contenido: ${error.message}</div>
      `;
      console.error(error);
    });
}
