const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;

const notesArray = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});

//route and adding a new notes

app.post("/api/notes", function (req, res) {
  let newNoteRequest = req.body;
  console.log("New request: ", newNoteRequest);

  notesArray.push(newNoteRequest);

  newNoteRequest.id = notesArray.indexOf(newNoteRequest);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));

  res.json({
    isError: false,
    message: "Successfully saved",
    port: PORT,
    status: 200,
    success: true,
  });
});

//deleting
app.delete("/api/notes/:id", function (req, res) {
  // id is index of note in notesArray
  let id = parseInt(req.params.id);
  // Use id index to remove item from notesArray
  let removeItemArray = notesArray.filter((item) => item.id != id);

  removeItemArray.forEach(
    (element) => (element.id = removeItemArray.indexOf(element))
  );

  fs.writeFileSync("./db/db.json", JSON.stringify(removeItemArray));

  res.json({
    isError: false,
    message: "Successfully deleted",
    port: PORT,
    status: 200,
    success: true,
  });
});
