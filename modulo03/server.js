const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

// CSS, etc
server.use(express.static("public"));

// config template engine
server.set("view engine", "html");

nunjucks.configure("views", {
  express: server,
});

server.get("/", function (req, res) {
  return res.render("about");
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos });
});

server.listen(5000, function () {
  console.log("server is running");
});
