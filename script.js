const fileInput = document.getElementById("file-input");
const uploadButton = document.getElementById("upload-button");
const messageDiv = document.querySelector(".message");
const successMessageDiv = document.getElementById("success-message");
const dropZone = document.getElementById("drop-zone");
let selectedFile = null;

// Función para mostrar el mensaje
function showMessage(message, isError = false) {
  const messageElement = isError ? messageDiv : successMessageDiv;
  messageElement.textContent = message;
  messageElement.style.display = "block"; // Mostrar el mensaje
}

// Función para mostrar el mensaje de archivo seleccionado
function showSelectedFileMessage(fileName) {
  const message = "Archivo seleccionado: " + fileName;
  showMessage(message, false);
}

// Agregar manejador de eventos para el cambio en el input de archivo
fileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  if (files.length > 0) {
    // Solo procesa el primer archivo si se seleccionan varios
    selectedFile = files[0];
    showSelectedFileMessage(selectedFile.name);
  }
});

// Cargar las credenciales desde el archivo JSON
const loadCredentials = async () => {
  try {
    const response = await fetch('credentials.json');
    const credentials = await response.json();

    // Configurar el SDK de AWS S3 con las credenciales y la región
    AWS.config.update({
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      region: credentials.region,
    });

    // Crear una instancia de S3
    const s3 = new AWS.S3();

    async function handleFileUpload(file) {
      if (file) {
        const object = {
          Key: file.name,
          Body: file,
          Bucket: "my-app-web-cc-23-2-miguel",
        };
      
        try {
          const result = await s3.putObject(object).promise();
          showMessage("El archivo se ha subido correctamente.", false);
          console.log(result);
        } catch (error) {
          showMessage("Error al subir el archivo. Detalles del error: " + error.message, true);
          console.error(error);
        }
      }
    }

    // Agregar manejador de evento para el evento 'dragover'
    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault(); // Prevenir el comportamiento predeterminado
      dropZone.classList.add("drag-over");
      dropZone.textContent = "Suelta el archivo aquí para subirlo";
    });

    // Agregar manejador de evento para el evento 'dragleave'
    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("drag-over");
      dropZone.textContent = "Arrastra y suelta archivos aquí o selecciona un archivo:";
    });

    // Agregar manejador de evento para el evento 'drop'
    dropZone.addEventListener("drop", (e) => {
      e.preventDefault(); // Prevenir el comportamiento predeterminado
      dropZone.classList.remove("drag-over");
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        // Solo procesa el primer archivo si se sueltan varios
        selectedFile = files[0];
        showSelectedFileMessage(selectedFile.name);
        uploadButton.disabled = false; // Habilitar el botón "Subir" cuando se suelta un archivo
      } else {
        showMessage("Arrastra y suelta archivos aquí o selecciona un archivo:", false);
      }
    });

    uploadButton.addEventListener("click", async () => {
      if (selectedFile) { // Verificar si se ha seleccionado un archivo
        await handleFileUpload(selectedFile);
      } else {
        showMessage("Selecciona un archivo antes de subirlo.", true);
      }
    });

  } catch (error) {
    console.error("Error al cargar las credenciales desde el archivo JSON:", error);
  }
};

// Llama a la función para cargar las credenciales
loadCredentials();
