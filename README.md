# Fabrica de Telas - API RESTful

Una API RESTful simple desarrollada en **Node.js y Express** para la gestión de datos de telas de una fábrica textil. Esta API permite realizar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de telas almacenada en memoria.

---

## Requerimientos del Trabajo Práctico

El objetivo es desarrollar una API que cumpla con los siguientes puntos, utilizando un **arreglo en memoria** para el almacenamiento de datos (sin base de datos persistente).

### Datos de Telas

Cada objeto de tela debe contar con los siguientes atributos:

* **`id`**: Número único, generado automáticamente.
* **`nombre`**: `string` (obligatorio). Nombre de la tela.
* **`descripcion`**: `string` (opcional). Descripción breve.
* **`precioPorMetro`**: `number`. Precio por metro en dólares ($), debe ser **mayor a 0**.
* **`cantidadDisponible`**: `number`. Metros disponibles en inventario, debe ser **mayor o igual a 0**.

### Endpoints de la API

La API expone los siguientes *endpoints* para interactuar con la colección de telas:

| Método HTTP | Endpoint | Descripción | Operación CRUD |
| :--- | :--- | :--- | :--- |
| `GET` | `/telas` | Devuelve la **lista completa** de telas. | **READ** |
| `GET` | `/telas/:id` | Devuelve los **detalles** de una tela específica según su ID. | **READ** |
| `POST` | `/telas` | **Crea una nueva tela** con los datos enviados en el cuerpo de la solicitud (formato JSON). | **CREATE** |
| `PUT` | `/telas/:id` | **Actualiza** los datos de una tela existente según su ID. | **UPDATE** |
| `DELETE` | `/telas/:id` | **Elimina** una tela específica según su ID. | **DELETE** |
