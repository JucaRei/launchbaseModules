const fs = require("fs");
const data = require("./data.json");
const { age, date } = require("./utils");

// Index
exports.index = function (req, res) {
  return res.render("instructors/index", { instructors: data.instructors });
};

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
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    // Do próprio JS
    created_at: new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: false,
    }).format(foundInstructor.created_at),
  };

  return res.render("instructors/show", { instructor });
};

// Create
exports.create = function (req, res) {
  return res.render("instructors/create");
};

// Post
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

    return res.redirect(`/instructors/${id}`);
  });
};

//EDIT
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  // instructor.birth = 05116622949499
  // date(instructor.birth)
  // return yyyy-mm-dd

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  };

  return res.render("instructors/edit", { instructor });
};

// put
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function (
    instructor,
    foundIndex
  ) {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error!");

    return res.redirect(`/instructors/${id}`);
  });
};

//delete
exports.delete = function (req, res) {
  // desestruturar id do req.body
  const { id } = req.body;

  const filteredInstrutors = data.instructors.filter(function (instructor) {
    return instructor.id != id;
  });

  data.instructors = filteredInstrutors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error!");

    return res.redirect("/instructors");
  });
};
