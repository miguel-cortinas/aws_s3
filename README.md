## Descripción General

Este código es una implementación en HTML / CSS /JavaScript que permite a los usuarios cargar archivos en un servicio de almacenamiento en la nube de AWS S3 a través de una interfaz de usuario intuitiva. La funcionalidad principal de la aplicación incluye:

* **Selección de Archivos**: Los usuarios pueden seleccionar archivos locales utilizando el elemento de entrada de archivo en la interfaz de usuario.

* **Arrastrar y Soltar**: Además de la selección de archivos tradicional, los usuarios también pueden arrastrar y soltar archivos directamente en una zona designada en la página web.

* **Carga de Archivos**: Una vez que se ha seleccionado o arrastrado un archivo, los usuarios pueden hacer clic en el botón "Subir" para cargar el archivo en el servicio AWS S3.

* **Mensajes de Estado**: La aplicación proporciona retroalimentación visual a los usuarios mediante mensajes de éxito o error, que se muestran en la interfaz de usuario.

* **Credenciales de AWS**: Para autenticarse en el servicio AWS S3, el código carga credenciales desde un archivo JSON llamado "credentials.json". Estas credenciales son necesarias para la interacción segura con el servicio de almacenamiento en la nube.

* **AWS SDK**: La aplicación utiliza el AWS SDK para interactuar con el servicio S3 de AWS de manera programática. Este SDK proporciona una interfaz fácil de usar para gestionar y cargar archivos en S3.

