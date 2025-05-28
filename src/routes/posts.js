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
const { postsPost, postsGetUser, postsGet, postsGetByUserId, } = require("../controllers/posts");

const router = Router();

router.post("/", [jwtValidation, fieldsValidator], postsPost);

router.get("/user", [jwtValidation, fieldsValidator], postsGetUser);

router.get("/", [jwtValidation, fieldsValidator], postsGet);

router.get("/by-user-id", [jwtValidation], postsGetByUserId);

module.exports = router;
