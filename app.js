const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// Ensure the 'files' directory exists
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)){
    fs.mkdirSync(filesDir);
}

// Get request to load the main page with existing files
app.get("/", function (req, res) {
    fs.readdir(filesDir, function (err, files) {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.render("p1", { files: files });
    });
});

// Display a specific file's content
app.get("/file/:filename", function(req, res) {
    const filepath = path.join(filesDir, req.params.filename);
    fs.readFile(filepath, "utf-8", function(err, filedata) {
        if (err) return res.status(500).send("Error loading file.");
        res.render("show", { filename: req.params.filename, filedata: filedata });
    });
});

// Display the edit form for a file
app.get("/edit/:filename", function(req, res) {
    const filename = req.params.filename;
    const filepath = path.join(filesDir, filename); // Remove .txt extension here
    fs.readFile(filepath, 'utf-8', (err, content) => {
        if (err) return res.status(500).send('Error loading the note.');
        res.render('edit', { filename: filename, content: content });
    });
});

// Handle the form submission for editing a file
app.post("/edit/:filename", function(req, res) {
    const filename = req.params.filename;
    const updatedContent = req.body.content; // Update this to match the form field name

    // Check if the content is provided
    if (typeof updatedContent === 'undefined') {
        return res.status(400).send('Content is required to update the note.');
    }

    // Write updated content to the file
    fs.writeFile(path.join(filesDir, filename), updatedContent, err => {
        if (err) return res.status(500).send('Error updating the note.');
        res.redirect('/');
    });
});

// Post request to delete a note
app.post("/delete/:filename", function(req, res) {
    const filename = req.params.filename;
    fs.unlink(path.join(filesDir, filename), err => {
        if (err) return res.status(500).send('Error deleting the note.');
        res.redirect('/');
    });
});

// Post request to create a new note
app.post("/create", function(req, res) {
    const title = req.body.filename.trim();
    const details = req.body.details;

    // Ensure title is safe for filenames and append .txt
    const sanitizedTitle = title.replace(/[<>:"/\\|?*]+/g, '_') + '.txt'; // Add .txt here

    fs.writeFile(path.join(filesDir, sanitizedTitle), details, function(err) {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.redirect("/");
    });
});

// Start the server
app.listen(2000, () => {
    console.log("Server is running on http://localhost:2000");
});
