const express = require("express");
const nunjucks = require("nunjucks");

const routes = require("./routes");

const server = express();

// ler os dados recebidos(req.body)
server.use(express.urlencoded({ extended: true }));

// CSS, etc
server.use(express.static("public"));
// usar o routes
server.use(routes);

// config template engine
server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(5000, function () {
  console.log("server is running");
});
