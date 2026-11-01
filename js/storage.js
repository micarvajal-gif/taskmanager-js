const STORAGE_KEY = 'tasks';

// Devuelve null si nunca se ha guardado nada (para saber si hay que importar de la API)
export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Datos corruptos en localStorage', error);
    return null;
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}