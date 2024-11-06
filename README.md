# API CRUD Artículos

Este proyecto es una API RESTful básica para gestionar artículos. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre artículos, utilizando **Node.js**, **Express**, **Sequelize** y **PostgreSQL** como base de datos.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para interactuar con la base de datos PostgreSQL.
- **PostgreSQL**: Base de datos relacional.
- **TypeScript**: Superset de JavaScript para un desarrollo más estructurado y seguro.
- **dotenv**: Gestión de variables de entorno.
- **nodemon**: Herramienta para reiniciar automáticamente el servidor en desarrollo.

## Requisitos

1. **Node.js** y **npm** instalados. Si no los tienes, puedes descargarlos desde [aquí](https://nodejs.org/).
2. **PostgreSQL**: Necesitarás tener PostgreSQL instalado y en funcionamiento.

## Instalación

### 1. Clona este repositorio:

```bash
git clone https://github.com/goarguello97/api-crud.git
cd api-crud
```

### 2. Crea la base de datos en PostgreSQL:

Antes de correr el proyecto, asegúrate de crear la base de datos en tu servidor de PostgreSQL. Puedes hacerlo con el siguiente comando:

```bash
psql -U tu_usuario -h localhost -p 5432
CREATE DATABASE nombre_de_base_de_datos
```

Asegúrate de reemplazar tu_usuario y nombre_de_base_de_datos con los valores correctos. Si tienes problemas para conectar a tu base de datos, revisa que PostgreSQL esté en ejecución y que las credenciales en el archivo .env sean correctas.

### 3. Instala las dependencias:

```bash
npm install
```

### 4. Configura las variables de entorno

Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

```bash
DB_HOST=tu_host
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
PORT=puerto_deseado_api
API_KEY=api_key_elegida
```

### 5. Compila el proyecto (si es necesario)

Si es la primera vez que compilas el proyecto o si has hecho cambios en los archivos TypeScript, ejecuta el siguiente comando para compilar el código:

```bash
npm run build
```

### 6. Inicia el servidor en modo desarrollo

Utiliza nodemon para iniciar el servidor en modo desarrollo. Este comando permite que el servidor se reinicie automáticamente cuando hagas cambios en los archivos.

```bash
npm run dev
```

### 7. Inicia el servidor en producción

Si deseas iniciar el servidor en producción, ejecuta:

```bash
npm run start
```

## Ejecución con Docker (Sin necesidad de instalar PostgreSQL)

Si no deseas instalar PostgreSQL de manera local, puedes ejecutar la aplicación utilizando Docker. Esto es útil ya que Docker creará un contenedor con PostgreSQL y otro con la aplicación, de manera que no necesitas configurar nada en tu máquina directamente.

### 1. Clona este repositorio:

```bash
git clone https://github.com/goarguello97/api-crud.git
cd api-crud
```

### 2. Configura las variables de entorno

Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

```bash
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
PORT=puerto_deseado_api
API_KEY=api_key_elegida
```

### 3. Ejecuta Docker Compose:

Una vez configuradas las variables de entorno, puedes construir y ejecutar los contenedores con el siguiente comando:

```bash
docker-compose up --build
```

## Endpoints

La API ofrece los siguientes endpoints para gestionar artículos:

Este comando hará lo siguiente:

-Construirá la imagen Docker de la aplicación.
-Iniciará los contenedores de la aplicación y PostgreSQL.
-Expondrá el puerto que hayas elegido para que puedas acceder a la API(Si no definiste un puerto en especifico, sera el 3001).

### Incluir la API Key en las solicitudes

Debes enviar la API Key como un encabezado **`api-key`** en tus solicitudes HTTP. El valor de este encabezado debe coincidir con la clave configurada en el servidor.

### 1. Obtener todos los artículos

-**URL**: `/api/articulos`

-**Método**: `GET`

-**Descripción**: Obtiene todos los artículos activos en la base de datos.

#### Respuesta exitosa:

```json
{
  "message": "Articulos obtenidos correctamente.",
  "articulos": [
    {
      "id": "c06490f2-424d-45bc-94de-05b2e499d550",
      "nombre": "Gaseosa",
      "fechaModificacion": "2024-11-06T00:50:44.854Z",
      "marca": "Coca-Cola",
      "estadoActivacion": true,
      "fechaCreacion": "2024-11-06T00:50:44.854Z"
    }
  ]
}
```

#### Respuesta de error:

```json
{
  "message": "No hay articulos que mostrar.",
  "articulos": []
}
```

### 2. Obtener un artículo por nombre

-**URL**: `/api/articulos`

-**Método**: `GET`

-**Parámetros de consulta**:
Busca artículos por nombre o estado de activación. Los parámetros se pasan como query parameters en la URL.

`nombre: Nombre del artículo (opcional).`

`estadoActivacion: Estado de activación del artículo (true o false).`

`busquedaExacta: Si se debe realizar una búsqueda exacta del nombre (opcional).`

-**Descripción**: Busca artículos por nombre y estado de activación.

#### Respuesta exitosa:

```json
{
  "message": "Articulo/s encontrado/s.",
  "articulo": [
    {
      "id": "e496e11e-75ef-4d26-8a93-a488125a9252",
      "nombre": "Gaseosa",
      "fechaModificacion": "2024-11-06T00:52:59.398Z",
      "marca": "Coca-Cola",
      "estadoActivacion": true,
      "fechaCreacion": "2024-11-06T00:52:59.398Z"
    }
  ]
}
```

#### Respuesta de error:

```json
{
  "message": "No hubo concidencias.",
  "articulo": []
}
```

### 3. Crear un nuevo artículo

-**URL**: `/api/articulos`

-**Método**: `POST`

-**Cuerpo de la solicitud (JSON)**:

```json
{
  "nombre": "Gaseosa",
  "marca": "Coca-Cola",
  "estadoActivacion": true // Si se omite, por default sera true,
}
```

-**Descripción**: Crea un nuevo artículo en la base de datos.

#### Respuesta exitosa:

```json
{
  "message": "Articulo creado correctamente.",
  "articulo": {
    "fechaModificacion": "2024-11-06T00:52:59.398Z",
    "id": "e496e11e-75ef-4d26-8a93-a488125a9252",
    "estadoActivacion": true,
    "nombre": "Gaseosa",
    "marca": "Coca-Cola",
    "fechaCreacion": "2024-11-06T00:52:59.398Z"
  }
}
```

#### Respuesta de error:

```json
{
  "message": "Error al crear artículo - Ya existe.",
  "error": {
    "type": "field",
    "value": "Gaseosa",
    "msg": "Error al crear artículo - Ya existe.",
    "path": "nombre",
    "location": "body"
  }
}
```

#### Respuesta de error si falta algún campo:

```json
{
  "message": "El nombre es obligatorio.",
  "error": {
    "type": "field",
    "value": "",
    "msg": "El nombre es obligatorio.",
    "path": "nombre",
    "location": "body"
  }
}
```

### 4. Modificar un artículo existente

**URL**: `/api/articulos/:id`

**Método**: `PUT`

**Cuerpo de la solicitud (JSON)**:

```json
{
  "nombre": "Gaseosa",
  "marca": "Pepsi"
}
```

**Descripción**: Modifica los datos de un artículo existente.

#### Respuesta exitosa:

```json
{
  "message": "Articulo modificado correctamente.",
  "articuloModificado": {
    "id": "8a9c04b9-8ca1-4569-ab6c-9e3bbb536884",
    "nombre": "Gaseosa",
    "fechaModificacion": "2024-11-06T00:56:05.509Z",
    "marca": "Pepsi",
    "estadoActivacion": true,
    "fechaCreacion": "2024-11-06T00:55:54.799Z"
  }
}
```

#### Respuesta de error:

```json
{
  "message": "No existe el artículo a modificar.",
  "error": {}
}
```

### 5. Eliminar un artículo(Soft delete)

**URL**: `/api/articulos/:id`

**Método**: `PATCH`

**Descripción**: Desactiva un artículo (soft delete).

#### Respuesta exitosa:

```json
{
  "message": "Articulo eliminado correctamente",
  "articuloEliminado": {
    "id": "8a9c04b9-8ca1-4569-ab6c-9e3bbb536884",
    "nombre": "Gaseosa",
    "fechaModificacion": "2024-11-06T00:57:20.657Z",
    "marca": "Pepsi",
    "estadoActivacion": false,
    "fechaCreacion": "2024-11-06T00:55:54.799Z"
  }
}
```

#### Respuesta de error:

```json
{
  "message": "No existe el artículo a eliminar.",
  "error": {}
}
```

### Error general si no esta autorizado mediante la api-key

```json
{
  "message": "Acceso denegado - Llave inválida"
}
```

### Middleware

La API utiliza los siguientes middlewares para asegurar la integridad de los datos y la seguridad:

**apiKey**: Protege todas las rutas requiriendo una clave API válida.
**validarCampos**: Valida los datos de entrada de acuerdo con los esquemas definidos usando express-validator.

### Validaciones

Para la creación y modificación de artículos, se asegura que el nombre y la marca no estén vacíos, que el nombre del artículo sea único y que no exceda los límites de longitud definidos.

### Estructura del Proyecto

El proyecto sigue una estructura comúnmente utilizada para aplicaciones de Node.js con TypeScript:

```bash
.
src/
├── config/
│   ├── dbConfig.ts                # Configuración de la base de datos (Sequelize)
├── controller/
│   ├── ArticuloController.ts # Controladores para manejar las solicitudes HTTP
├── helpers/
│   ├── nombreUnico.ts       # Función helper para verificar la unicidad del nombre de artículo
├── interfaces/
│   ├── articuloService.interface.ts  # Interfaces para el servicio de artículos
│   ├── envConfig.interface.ts       # Interfaces para las variables de entorno
│   ├── articuloModel.interface.ts   # Interfaces para los modelos de artículo
│   ├── errorMessage.interface.ts   # Interfaces para los errores
├── middlewares/
│   ├── apiKey.ts            # Middleware para verificar la clave API
│   ├── validarCampos.ts     # Middleware para validar los campos de entrada
├── models/
│   ├── Articulo.ts          # Modelo Sequelize para la entidad Artículo
├── routes/
│   ├── articulo.routes.ts   # Rutas para la gestión de artículos
│   ├── index.routes.ts      # Ruta principal que agrupa todas las rutas
├── services/
│   ├── ArticuloService.ts   # Lógica de negocio para interactuar con la base de datos
├── validators/
│   ├── ArticuloSchema.ts    # Validaciones para los datos de los artículos
├── .env                     # Archivo de configuración de variables de entorno
├── server.ts                # Archivo principal para iniciar el servidor Express
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Documentación
```
