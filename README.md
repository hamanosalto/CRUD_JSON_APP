# CRUD_JSON_APP
# 📝 シンプルToDoアプリ

Node.js と JSON ファイルを使って作られた、軽量・簡単なローカルToDoアプリです。
Webブラウザからタスクの追加・編集・削除ができます。

---

## 📦 機能一覧

- ToDoの追加
- ToDoの編集（インライン）
- ToDoの削除
- JSONファイルによるローカル保存
- レスポンシブ対応のシンプルなUI（Bootstrap使用）

## 🛠️ セットアップ方法

1. クローン
git clone https://github.com/あなたのユーザー名/todo-json-app.git
cd todo-json-app

2. 必要なファイルを準備
data.json（初期状態の空ファイル）をプロジェクトルートに作成

3. 依存パッケージをインストール
npm install express

4. サーバー起動
node app.js

5. ブラウザでアクセス
http://localhost:3000
📁 フォルダ構成
crud-json-app/
├── app.js               # Node.js サーバー
├── data.json            # ToDoデータを保存するローカルJSONファイル
├── public/
│   ├── index.html       # フロントエンドHTML
│   ├── script.js        # クライアント側JavaScript
│   └── styles.css       # カスタムCSS
└── README.md
🧠 使用技術
Node.js

Express

Bootstrap 5

HTML / CSS / JavaScript（Vanilla）
