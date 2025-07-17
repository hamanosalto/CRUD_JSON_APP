const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, 'data.json');

app.use(express.json());

// --- APIルートを先に定義 ---
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
  return res.json(readData());
});

// 新規ToDoを追加
app.post('/api/todos', (req, res) => {
  const todos = readData();
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: 'タスクのテキストが必要です' });
  }

  const newTodo = {
    id: Date.now().toString(), // IDは文字列で統一
    text: text.trim(),
    done: false,
  };

  todos.push(newTodo);
  writeData(todos);
  return res.status(201).json(newTodo);
});

// ToDoを削除
app.delete('/api/todos/:id', (req, res) => {
  const todos = readData();
  const updated = todos.filter(todo => String(todo.id) !== req.params.id);
  writeData(updated);
  return res.status(204).send();
});

// ToDo完了状態切替
app.put('/api/todos/:id/toggle', (req, res) => {
  const todos = readData();
  const index = todos.findIndex(todo => String(todo.id) === req.params.id);
  if (index !== -1) {
    todos[index].done = !todos[index].done;
    writeData(todos);
    return res.json(todos[index]);
  } else {
    return res.status(404).json({ message: 'Not found' });
  }
});

// ToDoテキスト編集
app.put('/api/todos/:id', (req, res) => {
  const todos = readData();
  const index = todos.findIndex(todo => String(todo.id) === req.params.id);
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: '空のタスクは保存できません' });
  }

  if (index !== -1) {
    todos[index].text = text.trim();
    writeData(todos);
    return res.json(todos[index]);
  } else {
    return res.status(404).json({ message: 'Not found' });
  }
});

// --- 最後に静的ファイルの配信 ---
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
