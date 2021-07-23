const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");
const notesRoutes = require("./routes/notes");

app.use("/admin", adminRoutes);
app.use(notesRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3001);
