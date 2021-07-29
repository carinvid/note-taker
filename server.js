const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

let notesArray = require("./db/db.json");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res, next) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res, next) {
  res.json(notesArray);
  //   if (result) {
  //     res.json(result);
  //   } else {
  //     res.send(404);
  //   }
});

app.listen(PORT, function () {
  console.log("App listening on PORT  " + PORT);
});

//route

app.post("/api/notes", function (req, res, next) {
  let newNoteadded = req.body;
  newNoteadded.id = uuidv4();
  console.log("New note added: ", newNoteadded);
  notesArray.push(newNoteadded);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));
  res.json(notesArray);
});

//
// app
//   .route("/note")
//   .get(function (req, res) {
//     res.send("Get a random note");
//   })
//   .post(function (req, res) {
//     res.send("Add a note");
//   })
//   .put(function (req, res) {
//     res.send("Update the note");
//   });

//for deleting
app.delete("/api/notes/:id", function (req, res, next) {
  let id = parseInt(req.params.id);
  notesArray = notesArray.filter((item) => item.id != id);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesArray));
  res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});
