import { Leon, Lobo, Oso, Serpiente, Aguila } from './animal.js';

(async () => {
  const cargarDatosAnimales = async () => {
    try {
      const respuesta = await fetch('./animales.json');
      const datos = await respuesta.json();
      const selectorAnimal = document.getElementById('animal');
      const preview = document.getElementById('preview');

      datos.animales.forEach(animal => {
        const img = new Image();
        img.src = `assets/imgs/${animal.imagen}`;

        img.onload = () => {
          console.log(`Imagen de ${animal.name} cargada correctamente.`);
          // Opcionalmente, puedes almacenar la imagen en algún lado si planeas usarla directamente
          // Por ahora, simplemente aseguramos que esté cargada y disponible
        };

        img.onerror = () => console.error(`Error al cargar la imagen de ${animal.name}.`);

        // Agregar opciones al selector basadas en los animales disponibles
        const opcion = new Option(animal.name, animal.name);
        selectorAnimal.add(opcion);
      });

      // Evento change para actualizar el preview con la imagen seleccionada
      selectorAnimal.addEventListener('change', function() {
        const animalSeleccionado = this.value;
        const animalDatos = datos.animales.find(animal => animal.name === animalSeleccionado);
        if (animalDatos) {
          preview.style.backgroundImage = `url('assets/imgs/${animalDatos.imagen}')`;
          preview.style.backgroundSize = 'cover';
          preview.style.backgroundPosition = 'center';
        }
      });

    } catch (error) {
      console.error('Error al cargar los datos de los animales:', error);
    }
  };

  await cargarDatosAnimales();
})();

document.addEventListener('DOMContentLoaded', () => {
  const btnRegistrar = document.getElementById('btnRegistrar');

  btnRegistrar.addEventListener('click', () => {
    // Obtener los valores de los campos del formulario
    const tipoAnimal = document.getElementById('animal').value;
    const edad = document.getElementById('edad').value;
    const comentarios = document.getElementById('comentarios').value;

    // Validar que todos los campos estén seleccionados
    if (!tipoAnimal || !edad || !comentarios) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Crear la instancia del animal correspondiente
    let animal;
    switch (tipoAnimal) {
      case 'Leon':
        animal = new Leon(tipoAnimal, edad, `assets/imgs/${tipoAnimal}.png`, comentarios, `assets/sounds/Rugido.mp3`);
        break;
      case 'Lobo':
        animal = new Lobo(tipoAnimal, edad, `assets/imgs/${tipoAnimal}.jpg`, comentarios, `assets/sounds/Aullido.mp3`);
        break;
      case 'Oso':
        animal = new Oso(tipoAnimal, edad, `assets/imgs/${tipoAnimal}.jpg`, comentarios, `assets/sounds/Gruñido.mp3`);
        break;
      case 'Serpiente':
        animal = new Serpiente(tipoAnimal, edad, `assets/imgs/${tipoAnimal}.jpg`, comentarios, `assets/sounds/Siseo.mp3`);
        break;
      case 'Aguila':
        animal = new Aguila(tipoAnimal, edad, `assets/imgs/${tipoAnimal}.png`, comentarios, `assets/sounds/Chillido.mp3`);
        break;
      default:
        alert('Tipo de animal no soportado.');
        return;
    }

    console.log(animal); // Aquí puedes manejar la instancia, por ejemplo, agregándola a una lista en el DOM
    
    // Opcional: Limpia los campos después de registrar el animal
    document.getElementById('animal').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('comentarios').value = '';
  
  // Dentro del evento click del botón "Agregar"

// Crear un nuevo div para el animal
const nuevoAnimalDiv = document.createElement('div');
nuevoAnimalDiv.classList.add('animal-card', 'm-2', 'position-relative');

// Agregar la imagen del animal
const imgAnimal = document.createElement('img');
imgAnimal.src = animal.img;
imgAnimal.alt = animal.nombre;
imgAnimal.style="width:180px"
imgAnimal.addEventListener('click', () => mostrarInfoModal(animal));
nuevoAnimalDiv.appendChild(imgAnimal);

// Agregar el ícono de audio
const iconoAudio = document.createElement('img');
iconoAudio.src = 'assets/imgs/audio.svg';
iconoAudio.alt = 'Reproducir audio';
iconoAudio.style="width: 20px; top: 100%; left: 45%;"
iconoAudio.classList.add('audio-icon', 'position-absolute');
iconoAudio.addEventListener('click', () => reproducirAudio(animal.sonido));
nuevoAnimalDiv.appendChild(iconoAudio);

// Agregar el nuevo div al contenedor de animales
document.getElementById('Animales').appendChild(nuevoAnimalDiv);
});
});
function reproducirAudio(rutaAudio) {
  const audio = new Audio(rutaAudio);
  audio.play();
}
// Función para mostrar la información del animal en el modal
function mostrarInfoModal(animal) {
  console.log(animal)
  // Actualizar el contenido del modal con los detalles del animal
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = `
    <img src="${animal.img}" alt="${animal.nombre}" class="img-fluid mb-3" style="height: auto;">
    <p><strong>Nombre:</strong> ${animal.nombre}</p>
    <p><strong>Edad:</strong> ${animal.edad}</p>
    <p><strong>Comentarios:</strong> ${animal.comentarios}</p>
  `;

  // Obtener la instancia del modal y abrirlo
  const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  modal.show();
}
