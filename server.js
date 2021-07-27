const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

const notesArray = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res, next) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res, next) {
  return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

//route

app.post("/api/notes", function (req, res, next) {
  let newNoteadded = req.body;
  console.log("New note add: ", newNoteadded);

  notesArray.push(newNoteadded);

  newNoteadded.id = notesArray.indexOf(newNoteadded);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));

  res.json({
    isError: false,
    message: "Successfully saved",
    port: PORT,
    status: 200,
    success: true,
  });
});

//for deleting
app.delete("/api/notes/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let deletingNote = notesArray.filter((item) => item.id != id);

  deletingNote.forEach(
    (element) => (element.id = deletingNote.indexOf(element))
  );

  fs.writeFileSync("./db/db.json", JSON.stringify(deletingNote));

  res.json({
    isError: false,
    message: "Successfully deleted",
    port: PORT,
    status: 200,
    success: true,
  });
});
