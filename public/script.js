const form = document.getElementById('todo-form');
const list = document.getElementById('todo-list');

async function fetchTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center justify-content-between';

    const textSpan = document.createElement('span');
    textSpan.id = `text-${todo.id}`;
    textSpan.textContent = todo.text;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.id = `edit-${todo.id}`;
    editInput.value = todo.text;
    editInput.className = 'form-control form-control-sm me-3';
    editInput.style.display = 'none';
    editInput.style.flex = '1';

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group btn-group-sm';

    const editBtn = document.createElement('button');
    editBtn.textContent = '編集';
    editBtn.className = 'btn btn-outline-primary';
    editBtn.id = `edit-btn-${todo.id}`;
    editBtn.addEventListener('click', () => startEdit(todo.id));

    const saveBtn = document.createElement('button');
    saveBtn.textContent = '保存';
    saveBtn.className = 'btn btn-primary';
    saveBtn.id = `save-${todo.id}`;
    saveBtn.style.display = 'none';
    saveBtn.addEventListener('click', () => saveEdit(todo.id));

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'キャンセル';
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.id = `cancel-${todo.id}`;
    cancelBtn.style.display = 'none';
    cancelBtn.addEventListener('click', () => cancelEdit(todo.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(saveBtn);
    btnGroup.appendChild(cancelBtn);
    btnGroup.appendChild(deleteBtn);

    const leftDiv = document.createElement('div');
    leftDiv.className = 'd-flex align-items-center flex-grow-1';

    leftDiv.appendChild(textSpan);
    leftDiv.appendChild(editInput);

    li.appendChild(leftDiv);
    li.appendChild(btnGroup);

    list.appendChild(li);

    editInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveEdit(todo.id);
      if (e.key === 'Escape') cancelEdit(todo.id);
    });
  });
}

function startEdit(id) {
  document.getElementById(`text-${id}`).style.display = 'none';
  document.getElementById(`edit-${id}`).style.display = 'inline-block';

  document.getElementById(`edit-btn-${id}`).style.display = 'none';
  document.getElementById(`save-${id}`).style.display = 'inline-block';
  document.getElementById(`cancel-${id}`).style.display = 'inline-block';
}

function cancelEdit(id) {
  document.getElementById(`text-${id}`).style.display = 'inline';
  document.getElementById(`edit-${id}`).style.display = 'none';

  document.getElementById(`save-${id}`).style.display = 'none';
  document.getElementById(`cancel-${id}`).style.display = 'none';
  document.getElementById(`edit-btn-${id}`).style.display = 'inline-block';
}

async function saveEdit(id) {
  const newText = document.getElementById(`edit-${id}`).value;

  const res = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newText }),
  });

  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  fetchTodos();
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const text = document.getElementById('text').value;

  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  form.reset();
  fetchTodos();
});

fetchTodos();
