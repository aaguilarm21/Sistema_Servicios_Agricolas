# 🌾 Sistema de Servicios Agrícolas - Documentación Técnica

Esta documentación está diseñada para ser copiada directamente a **Notion**. Cubre la arquitectura, la estructura de la base de datos, los módulos del sistema y la configuración del entorno.

---

## 1. 🏗️ Arquitectura General

El sistema está construido como una aplicación monolítica utilizando **Django** (Python) para el backend y **HTML/CSS/JS (Vanilla)** para el frontend. No se utilizan frameworks reactivos pesados (como React o Angular), lo que permite un renderizado rápido desde el servidor.

*   **Backend:** Django (Python). Maneja la lógica de negocio, ORM, autenticación de usuarios y exposición de endpoints REST-like.
*   **Frontend:** Django Templates (`.html`), estilizados con CSS personalizado (`modulos.css`, `registros.css`) y fuertemente adaptados a dispositivos móviles.
*   **Base de Datos:** Relacional (SQLite3 en desarrollo / PostgreSQL en producción), gestionada mediante el ORM de Django.

---

## 2. 🗄️ Modelos de Base de Datos (ORM)

Los modelos principales están definidos en la aplicación `accounts` (`accounts/models.py`).

### 👤 Usuarios y Perfiles
*   **`User` (Django Default):** Maneja la autenticación básica (username, password, roles/grupos).
*   **`UserProfile`:** Extiende el usuario por defecto. Relación OneToOne.
    *   *Campos Clave:* `usuario`, `codigo`, `puesto`.
*   **`Empleado`:** Catálogo del personal de la finca.
    *   *Campos Clave:* `empresa`, `empleado`, `no_cui`, `puesto`, `nombre_puesto`.

### 🚜 Catálogos Principales
*   **`Proveedor`:** `codigo`, `nit`, `razon_social`, `regimen_tributario`, `dias_credito`.
*   **`Maquinaria`:** `codigo_maquina`, `tipo_maquina`, `marca_maquina`, `placa_matricula`.
*   **`Bodega`:** `codigo`, `nombre_bodega`, `unidad_medida`, `capacidad`.
*   **`Articulo`:** `codigo_articulo`, `descripcion`, `unidad_medida`, `categoria`, `stock`.

### 📋 Catálogos Auxiliares
Modelos pequeños utilizados para alimentar listas desplegables (Dropdowns) en los módulos operativos.
*   `Labor`, `Cuenta` (incluye tipo), `UnidadMedida`, `Variedad`, `TipoMaquina`, `Marca`, `Municipio`, `Auxiliar`.

### 📝 Registros Operativos (Transaccional)
El núcleo del sistema.
*   **`RegistroOperativo`:** Almacena la información de las boletas y operaciones de campo.
    *   *Campos Destacados:* `no_boleta`, `fecha_labor`, `tipo_servicio`, `proveedor`, `codigo_maquina`, `finca`, `lote`, `unidades`, `costo_unitario`, `cuenta_contable`.
    *   *Supervisión:* Campos para `caporal_01`, `mayordomo`, `administrador`.

---

## 3. 🖥️ Módulos y Rutas (Frontend / Vistas)

Las rutas están definidas en `miproyecto/urls.py` y las funciones controladoras en `accounts/views.py` / `Backend/views.py`.

| Ruta | Nombre de Vista | Descripción |
| :--- | :--- | :--- |
| `/accounts/login/` | `CustomLoginView` | Pantalla de inicio de sesión de usuarios. |
| `/modulos/` | `modulos` | **Dashboard Principal.** Menú centralizado para navegar a los demás módulos. |
| `/configuracion/` | `configuracion_catalogos` | Módulo Administrativo. Permite el CRUD (Crear, Leer, Actualizar, Borrar) de los catálogos principales y auxiliares en una vista de dos paneles. |
| `/registros/` | `registros_operativos` | Formulario de captura de datos en campo. Adaptado a móviles. |
| `/registros-data/` | `registros_operativos_data` | Visualización en tabla (Base de datos) de las boletas ingresadas, con opciones de edición y borrado. |
| `/reportes/` | `reportes` | Motor de reportes. Filtra por fechas y tipo de servicio. Optimizada para impresión o exportación a PDF (oculta elementos UI al imprimir). |
| `/operacion/` | `operacion` | Módulo de Operación Agrícola y logística. |
| `/usuarios/` | `usuarios` | Módulo para generar accesos al sistema a partir del catálogo de Empleados. |

---

## 4. 🎨 Diseño e Interfaz (UI/UX)

El diseño es **Mobile-First**, priorizando la usabilidad de los supervisores directamente en el campo.

*   **Paleta de Colores:** Identidad corporativa agrícola. Verdes principales (`#2e7d32`, `#388e3c`), fondos (`#e8f5e8`, `#f1f8e9`).
*   **Hojas de Estilos Base:**
    *   `modulos.css`: Layout del dashboard, menús interactivos, tarjetas (cards) y catálogos.
    *   `registros.css`: Estilos del formulario operativo, inputs anchos para pantallas táctiles y alertas.
*   **Componentes UI:**
    *   **`.btn-primary`**: Botón principal verde con sombra. Usado para "Guardar", "Registrar".
    *   **`.btn-secondary`**: Botón secundario gris claro. Usado para "Limpiar", "Limpiar Filtros".
    *   **`.btn-volver`**: Botón estandarizado de bloque (ancho 100%) usado para retornar al menú de módulos desde cualquier pantalla.

---

## 5. 🛠️ Flujos Automatizados y Validaciones

Existen reglas de negocio implementadas para garantizar la integridad de los datos:

1.  **Formateo Automático (Title Case):** En los catálogos (ej. *Tipo de Máquina*), la descripción se transforma automáticamente a "Formato Título" (Ej: "Tractor Agricola") para evitar duplicidad por errores de tipografía.
2.  **Autocompletado de Registros:** 
    *   Si el usuario ingresa un `0` en campos de nombres de supervisor (Caporal, Mayordomo), el sistema asigna la palabra `"Ninguno"`.
    *   Si la "Cuenta Contable" no se provee, se genera un número predeterminado aleatorio de 6 dígitos.
3.  **Validaciones HTML5:** Todos los inputs en los formularios de operación (`registros_operativos.html`, `operacion.html`) tienen el atributo `required`, obligando a no dejar campos en blanco.
4.  **Despliegues Dinámicos:** Los campos como "Maquinaria", "Fincas", y "Unidades de Medida" son elementos `<select>` que consumen directamente la información guardada en los Catálogos.

---

## 6. 🚀 Comandos de Despliegue y Desarrollo

### Iniciar el Servidor Local
```bash
python manage.py runserver
```

### Gestión de Base de Datos
Cada vez que se modifique el archivo `models.py` para agregar tablas o columnas, se deben ejecutar:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Control de Versiones (Git)
Para guardar el trabajo y subirlo a la nube:
```bash
git add .
git commit -m "Descripción clara de los cambios"
git push
```
