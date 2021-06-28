const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

// Index
exports.index = function (req, res) {
  return res.render("members/index", { members: data.members });
};

// show
exports.show = function (req, res) {
  // req.query.id
  // req.body
  // req.params.id = /:id
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) return res.send("Member not found!");

  const member = {
    // spread (pega tudo)
    ...foundMember,
    // corrige
    age: age(foundMember.birth),
    // Do próprio JS
  };

  return res.render("members/show", { member });
};

// Create
exports.create = function (req, res) {
  return res.render("members/create");
};

// Post
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    // uma linha só depois do if não precisa de chaves
    if (req.body[key] == "") return res.send("Please, fill all fields");
  }

  // Destructuring
  let { avatar_url, birth, name, gender } = req.body;

  birth = Date.parse(birth);
  const id = Number(data.members.length + 1);

  data.members.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
  }); // [{...}, {...}]

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error!");

    return res.redirect(`/members/${id}`);
  });
};

//EDIT
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) return res.send("Member not found!");

  // member.birth = 05116622949499
  // date(member.birth)
  // return yyyy-mm-dd

  const member = {
    ...foundMember,
    birth: date(foundMember.birth),
  };

  return res.render("members/edit", { member });
};

// put
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function (member, foundIndex) {
    if (id == member.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.send("Member not found!");

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write error!");

    return res.redirect(`/members/${id}`);
  });
};

//delete
exports.delete = function (req, res) {
  // desestruturar id do req.body
  const { id } = req.body;

  const filteredInstrutors = data.members.filter(function (member) {
    return member.id != id;
  });

  data.members = filteredInstrutors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error!");

    return res.redirect("/members");
  });
};
