const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;
const directoryPath = path.join(__dirname, "files");

app.post("/new_file", (req, res) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + "_" + time;

  fs.writeFileSync(`files/${dateTime}.txt`, new Date().toString());
  res.send("File created");
});

app.get("/", (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    res.send(JSON.stringify(files));
  });
});

app.listen(port, () => {
  console.log("App started");
});
