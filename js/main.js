import { loadTasks, saveTasks } from './storage.js';
import { fetchTasks } from './api.js';
import { getVisibleTasks, renderTasks, renderMetrics, showNotification } from './ui.js';

let tasks = [];
const view = { filter: 'all', query: '', sort: 'date' };

const form = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const prioritySelect = document.getElementById('task-priority');
const list = document.getElementById('task-list');

function refresh() {
  renderTasks(getVisibleTasks(tasks, view));
  renderMetrics(tasks);
}

function persist() {
  saveTasks(tasks);
  refresh();
}

async function init() {
  const stored = loadTasks();
  if (stored !== null) {
    tasks = stored;
  } else {
    try {
      tasks = await fetchTasks();
      saveTasks(tasks);
    } catch (error) {
      console.error(error);
      tasks = [];
      showNotification('No pudimos cargar las tareas iniciales. Revisa tu conexión e inténtalo de nuevo.', 'error');
    }
  }
  refresh();
}

// CREAR
form.addEventListener('submit', event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (title === '') {
    showNotification('El título no puede estar vacío.', 'error');
    return;
  }
  tasks.push({
    id: Date.now(),
    title,
    completed: false,
    priority: prioritySelect.value,
    createdAt: Date.now()
  });
  titleInput.value = '';
  persist();
  showNotification('Tarea agregada.', 'success');
});

// EDITAR y ELIMINAR (delegación de eventos)
list.addEventListener('click', event => {
  const li = event.target.closest('li[data-id]');
  if (!li) return;
  const id = Number(li.dataset.id);
  const action = event.target.dataset.action;

  if (action === 'delete') {
    tasks = tasks.filter(t => t.id !== id);
    persist();
    showNotification('Tarea eliminada.', 'info');
  }

  if (action === 'edit') {
    const task = tasks.find(t => t.id === id);
    const newTitle = prompt('Editar tarea:', task.title);
    if (newTitle === null) return; // canceló
    if (newTitle.trim() === '') {
      showNotification('El título no puede estar vacío.', 'error');
      return;
    }
    task.title = newTitle.trim();
    persist();
    showNotification('Tarea actualizada.', 'success');
  }
});

// MARCAR COMO COMPLETADA
list.addEventListener('change', event => {
  if (event.target.dataset.action !== 'toggle') return;
  const id = Number(event.target.closest('li').dataset.id);
  const task = tasks.find(t => t.id === id);
  task.completed = event.target.checked;
  persist();
});

init();