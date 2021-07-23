const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const notesArray = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3001;
