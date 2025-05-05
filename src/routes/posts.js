const { Router } = require("express");
const fieldsValidator = require("../middlewares/fields");
const {
  emailPatch,
  passwordPatch,
  namePatch,
  phonePatch,
} = require("../controllers/user");
const { check } = require("express-validator");
const jwtValidation = require("../middlewares/jwt_validation");
const { postsPost } = require("../controllers/posts");

const router = Router();

router.post("/", [jwtValidation, fieldsValidator], postsPost);

module.exports = router;
