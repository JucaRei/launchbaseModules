const fs = require("fs");
const data = require("./data.json");

// show
exports.show = function (req, res) {
  // req.query.id
  // req.body
  // req.params.id = /:id
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    // spread (pega tudo)
    ...foundInstructor,
    // corrige
    age: "",
    services: foundInstructor.services.split(","),
    created_at: "",
  };

  return res.render("instructors/show", { instructor });
};

// Create
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    // uma linha só depois do if não precisa de chaves
    if (req.body[key] == "") return res.send("Please, fill all fields");
  }

  // Destructuring
  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  }); // [{...}, {...}]

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error!");

    return res.redirect("/instructors");
  });
};

// Update

//delete
