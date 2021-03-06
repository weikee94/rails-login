import express from "express";
import isEmpty from "lodash/isEmpty";
import validator from "validator";

let router = express.Router();

const validateInput = data => {
  let errors = {};

  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "The field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password is required";
  }

  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

router.post("/", (req, res) => {
  const { errors, isValid } = validateInput(req.body);

  if (isValid) {
    res.json({ success: true });
  } else {
    res.status(400).json(errors);
  }
});

// router.post("/articles", (req, res) => {});

export default router;
