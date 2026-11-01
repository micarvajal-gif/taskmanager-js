# TaskManager

Aplicación de gestión de tareas desarrollada con JavaScript Vanilla (ES6+), sin librerías ni frameworks. Funciona sin conexión gracias a localStorage.

## Funcionalidades
- Crear, editar, eliminar y marcar tareas como completadas, con validación de campos vacíos.
- Filtro por estado (Todas, Pendientes, Completadas) y búsqueda en tiempo real por título.
- Ordenamiento por fecha de creación o por prioridad (Alta, Media, Baja).
- Dashboard con total, pendientes y completadas.
- Carga inicial desde la API JSONPlaceholder (solo si localStorage está vacío) y manejo de errores con notificaciones.
- Persistencia en localStorage.

## Técnica de investigación
Arquitectura modular ES6 (Opción A): el código está separado en módulos con `import` / `export`.

## Estructura
taskmanager-js/
├── index.html
├── css/styles.css
└── js/
├── main.js (lógica principal y eventos)
├── api.js (servicio API con fetch)
├── storage.js (manejo de localStorage)
└── ui.js (DOM, filtros, orden y métricas)

## Cómo ejecutarlo
Los módulos ES6 requieren un servidor local (no funcionan abriendo el archivo con doble clic):
1. Instala la extensión **Live Server** en VS Code.
2. Clic derecho sobre `index.html` > **Open with Live Server**.
3. Abre la dirección `http://127.0.0.1:5500` en el navegador.

## Autor
Michael Carvajal - Sistemas Inteligentes, Universidad Ecotec