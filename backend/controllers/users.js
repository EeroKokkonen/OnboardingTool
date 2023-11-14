const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const Joi = require("joi");

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  const UserSchema = Joi.object().keys({
    name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .pattern(new RegExp("[a-z A-Z]")),
    email: Joi.string()
      .min(4)
      .max(50)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fi"] } })
      .required(),
    password: Joi.string()
      .min(8)
      .max(60)
      .required(),
  });

  const { error } = UserSchema.validate(req.body);

  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
    return;
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send("Could not create user, try again please");
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword,
  };

  try {
    const exist = await users.findByEmail(newUser.email);
    if (exist.length > 0) {
      return res.status(422).send("Could not create user, user exists");
    }

    const result = await users.create(newUser);
    if (!result) {
      return res.status(500).send("Could not create user, try again please");
    }

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Could not create user, try again please");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      return res.status(401).send("No user found - Check your credentials");
    }
    identifiedUser = result[0];
  } catch (err) {
    console.log(err)
    return res.status(500).send("Something went wrong");
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
    if (!isValidPassword) {
      return res.status(401).send("No user found - Check your credentials");
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send("Something went wrong");
  }

  try {
    const token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      id: identifiedUser.id,
      email: identifiedUser.email,
      token,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send("Something went wrong");
  }
};

const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await users.findById(uid);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
};

module.exports = {
  loginUser,
  signUpUser,
  getUserById,
};
