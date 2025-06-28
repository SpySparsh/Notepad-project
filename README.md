A simple web-based Notepad built with Node.js and Express.js. This application allows users to create, read, update, and delete notes, with all data stored in the local filesystem—no database required.

🔍 Features
✅ Create Notes: Add a new note by entering a title and description.

📄 View Notes: Browse all saved notes by title on the homepage.

🔎 Read Full Note: Click on any note to view its full content.

✏️ Edit Notes: Update the title or description of an existing note.

🗑️ Delete Notes: Permanently remove a note with one click.

💾 Local Storage: Notes are saved as individual files on your local machine using Node’s fs module.

⚙️ Tech Stack
Backend: Node.js, Express.js

Frontend: HTML, CSS, JavaScript

Storage: Filesystem-based (no database)

```📂 Project Structure
notepad-app/
├── files/
├── node_module/
├── public/
├── views/
│   ├── edit.ejs
│   ├── p1.ejs
│   └── show.ejs            # Folder where all note files are stored
├── app.js                 # Main Express app
└── package.json
```
🚀 Getting Started
1. Clone the Repository
git clone https://github.com/yourusername/notepad-app.git
cd notepad-app
2. Install Dependencies
npm install
3. Run the App
node app.js
Visit http://localhost:2000 in your browser to access the app.

🛡️ License
This project is licensed under the MIT License.
