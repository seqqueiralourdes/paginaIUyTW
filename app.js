// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker registrado'))
      .catch(err => console.log('Error:', err));
  });
}

// URL de la función serverless
// Por ahora apunta a local, después la cambiamos por la URL de Google Cloud
const API_URL = 'https://country-api-buu5.onrender.com';

// Función para cargar los datos del country
async function cargarDatos() {
  try {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();

    // Mostrar avisos
    const listaAvisos = document.getElementById('lista-avisos');
    if (listaAvisos) {
      listaAvisos.innerHTML = '';
      datos.avisos.forEach(aviso => {
        const item = document.createElement('li');
        item.textContent = aviso;
        listaAvisos.appendChild(item);
      });
    }

    // Mostrar expensas
    const estadoExpensas = document.getElementById('estado-expensas');
    if (estadoExpensas) {
      estadoExpensas.textContent = `Estado: ${datos.expensas.estado} | Monto: $${datos.expensas.monto} | Vencimiento: ${datos.expensas.vencimiento}`;
    }

  } catch (error) {
    console.log('Error al cargar datos:', error);
  }
}

// Cargar datos cuando la página esté lista
window.addEventListener('load', cargarDatos);
