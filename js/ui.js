const list = document.getElementById('task-list');
const notification = document.getElementById('notification');
let notificationTimer;

const PRIORITY_WEIGHT = { Alta: 3, Media: 2, Baja: 1 };

export function showNotification(message, type = 'info') {
  notification.textContent = message;
  notification.className = `notification ${type}`;
  clearTimeout(notificationTimer);
  notificationTimer = setTimeout(() => notification.classList.add('hidden'), 4000);
}

// filter() devuelve un arreglo nuevo, así sort() no modifica el original
export function getVisibleTasks(tasks, { filter, query, sort }) {
  const search = query.trim().toLowerCase();
  return tasks
    .filter(t => filter === 'all' || (filter === 'pending' ? !t.completed : t.completed))
    .filter(t => t.title.toLowerCase().includes(search))
    .sort((a, b) => {
      if (sort === 'priority') {
        return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
      }
      return b.createdAt - a.createdAt; // más recientes primero
    });
}

export function renderTasks(tasks) {
  list.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'No hay tareas para mostrar.';
    list.appendChild(empty);
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = 'task' + (task.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.dataset.action = 'toggle';

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = task.title;

    const badge = document.createElement('span');
    badge.className = `badge ${task.priority.toLowerCase()}`;
    badge.textContent = task.priority;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.dataset.action = 'edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.dataset.action = 'delete';

    li.append(checkbox, title, badge, editBtn, deleteBtn);
    list.appendChild(li);
  });
}

export function renderMetrics(tasks) {
  const completed = tasks.filter(t => t.completed).length;
  document.getElementById('metric-total').textContent = tasks.length;
  document.getElementById('metric-completed').textContent = completed;
  document.getElementById('metric-pending').textContent = tasks.length - completed;
}