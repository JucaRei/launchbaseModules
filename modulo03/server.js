const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

// CSS, etc
server.use(express.static("public"));

// config template engine
server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", function (req, res) {
  const about = {
    avatar_url: "https://media.giphy.com/media/ko7twHhomhk8E/giphy.gif",
    name: "Reinaldo Ponce Junior",
    role: "Programador Fullstack em construção",
    description: "Buscando se tornar um profissional bem capacitado!",
    links: [
      { name: "Github", url: "https://github.com/JucaRei" },
      { name: "Twitter", url: "https://twitter.com" },
      { name: "Linkedin", url: "https://www.linkedin.com" },
    ],
  };

  // {about: about}
  return res.render("about", { about });
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos });
});

server.get("/video", function (req, res) {
  // query string (ex: /video?id=blabla)
  const id = req.query.id;

  const video = videos.find(function (video) {
    return video.id == id;
  });

  if (!video) {
    return res.send("Video not found.");
  }

  return res.render("video", { item: video });
});

server.listen(5000, function () {
  console.log("server is running");
});
