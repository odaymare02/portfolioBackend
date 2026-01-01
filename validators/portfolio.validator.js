const { body } = require("express-validator");

exports.createPortfolioValidator = [
  body("username").notEmpty(),
  body("name").notEmpty(),
  body("skills").isArray().optional(),
  body("projects").isArray().optional(),
  body("experience").isArray().optional(),
  body("education").isArray().optional(),
  body("certificates").isArray().optional(),
];
