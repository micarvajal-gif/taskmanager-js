const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';
const PRIORITIES = ['Alta', 'Media', 'Baja'];

export async function fetchTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Error del servidor (${response.status})`);
  }
  const data = await response.json();
  const now = Date.now();

  // Adaptamos el formato de JSONPlaceholder a nuestro modelo
  return data.map((item, index) => ({
    id: item.id,
    title: item.title,
    completed: item.completed,
    priority: PRIORITIES[index % PRIORITIES.length],
    createdAt: now - (data.length - index) * 60000
  }));
}