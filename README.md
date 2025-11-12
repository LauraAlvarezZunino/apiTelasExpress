TP Fabrica de Telas
Una fábrica textil necesita una API RESTful simple para gestionar los datos de sus telas. La API debe permitir realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de telas almacenada en un arreglo en memoria (sin base de datos). Cada tela tiene un código único, nombre, descripción, precio por metro y cantidad disponible en inventario.
API RESTful utilizando Node.js y Express que cumpla con los siguientes puntos:
Datos de Telas:
Cada tela debe tener los siguientes atributos:
id (número único, generado automáticamente).
nombre (string, nombre de la tela, obligatorio).
descripcion (string, descripción breve, opcional).
precioPorMetro (número, precio por metro en dólares, mayor a 0).
cantidadDisponible (número, metros disponibles en inventario, mayor o igual a 0).
Los datos se almacenarán en un arreglo en memoria (no se requiere base de datos).
Endpoints de la API:
GET /telas: Devuelve la lista completa de telas.
GET /telas/:id: Devuelve los detalles de una tela específica según su ID.
POST /telas: Crea una nueva tela con los datos enviados en el cuerpo de la solicitud (formato JSON).
PUT /telas/:id: Actualiza los datos de una tela existente según su ID.
DELETE /telas/:id: Elimina una tela específica según su ID.
