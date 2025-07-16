const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static('public'));

// データ読み込み
function readData() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// データ書き込み
function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('✅ data.json updated');
  } catch (err) {
    console.error('❌ Failed to write data.json:', err);
  }
}

// すべてのToDoを取得
app.get('/api/todos', (req, res) => {
  res.json(readData());
});

// 新規ToDoを追加
app.post('/api/todos', (req, res) => {
  const todos = readData();
  const { text } = req.body;

  const newTodo = {
    id: Date.now().toString(), // ← ここを文字列にするのがポイント！
    text,
    done: false,
  };

  todos.push(newTodo);
  writeData(todos);
  res.status(201).json(newTodo);
});

// ToDoを削除
app.delete('/api/todos/:id', (req, res) => {
  const todos = readData();
  const updated = todos.filter(todo => String(todo.id) !== req.params.id);
  writeData(updated);
  res.status(204).send();
});

// ToDoの完了状態をトグル
app.put('/api/todos/:id/toggle', (req, res) => {
  const todos = readData();
  const index = todos.findIndex(todo => String(todo.id) === req.params.id);
  if (index !== -1) {
    todos[index].done = !todos[index].done;
    writeData(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// ToDoの編集（テキスト更新）
app.put('/api/todos/:id/toggle', (req, res) => {
  const todos = readData();
  const index = todos.findIndex(todo => String(todo.id) === req.params.id);
  if (index !== -1) {
    todos[index].done = !todos[index].done;
    writeData(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
