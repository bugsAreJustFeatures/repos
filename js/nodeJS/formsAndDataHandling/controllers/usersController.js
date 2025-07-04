const usersStorage = require("../storages/usersStorage")

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";


// validate inputs
const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`)
    .toLowerCase(),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`)
    .toLowerCase(),
  body("email").trim()
    .isEmail().withMessage("Please Enter a valid email")
    .toLowerCase(),
  body("age").trim()
    .isInt({ min: 18, max: 120})
    .withMessage("Enter a valid age between 18 - 120"),
  body("bio")
    .isAlphanumeric()
    .isLength({ min: 0, max: 120})
];

//create default users to fill database 
exports.usersDefaultGet = (req, res, next) => {
  if (usersStorage.id == 0) {
   usersStorage.addUser({
    firstName: "john",
    lastName: "smith",
    age: 18, 
    email: "johnsmith123@myEmail.com", 
    bio: "thisIsMyBio"
  })
   usersStorage.addUser({
    firstName: "diana",
    lastName: "smith",
    age: 19, 
    email: "dianasmith123@myEmail.com", 
    bio: "thisIsMyBio"
  })
   usersStorage.addUser({
    firstName: "harry",
    lastName: "smith",
    age: 88, 
    email: "harrysmith123@myEmail.com", 
    bio: "thisIsMyBio"
  })
   usersStorage.addUser({
    firstName: "lily",
    lastName: "smith",
    age: 34, 
    email: "lilysmith123@myEmail.com", 
    bio: "thisIsMyBio"
  })
   usersStorage.addUser({
    firstName: "james",
    lastName: "smith",
    age: 78, 
    email: "jamessmith123@myEmail.com", 
    bio: "thisIsMyBio"
  }) 
  }
  
}

//gather users
exports.usersListGet = (req, res) => {
  this.usersDefaultGet()
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

//create user
exports.usersCreateGet = (req, res) => {
    res.render("createUser", {
        title: "Create User",
    })
}

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, age, email, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, age, email, bio });
    res.redirect("/");
  }
];

//updating inputs
exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, age, email, bio } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName, age, email, bio });
    res.redirect("/");
  }
];

//delete user
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

//search user
exports.usersSearchGet = (req, res) => {
  res.render("searchUser", { title: "Search Page"})
}

// show user if found, if not, show unable to message and allow user to go back to either home or search page
exports.usersFoundGet = (req, res) => {
  const firstName = req.query.searchFirstName
  const lastName = req.query.searchLastName

  const amount = usersStorage.id
  // console.log(usersStorage.getUsers())
  // console.log(amount)
  // res.send(amount)
  if (amount > 0) {
    for (let i = 0; i < amount; i++) {
    let checkUser = usersStorage.getUser(i)
    if (checkUser.firstName == firstName && checkUser.lastName == lastName) {
      let displayUserInfo = usersStorage.getUser(i)
      let userData = Object.values(displayUserInfo).join(", ")
      res.render("foundUser", { title: "Found User", user: userData})
    }
    }
  } else {
    res.render("foundUser", {title: "Unable to find user: ", user: `${firstName} ${lastName} `})
    }
}

