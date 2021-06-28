const express = require("express");
const nunjucks = require("nunjucks");
const methodOverride = require("method-override");

const routes = require("./routes");

const server = express();

// ler os dados recebidos(req.body)
server.use(express.urlencoded({ extended: true }));
// CSS, etc
server.use(express.static("public"));
// sobreescrever, poder usar put/delete no html
server.use(methodOverride("_method"));
// usar o routes
server.use(routes);

// config template engine
server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(5000, function () {
  console.log("server is running");
});
