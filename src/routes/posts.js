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
const { postsPost, postsGetUser, postsGet, postsGetByUser } = require("../controllers/posts");

const router = Router();

router.post("/", [jwtValidation, fieldsValidator], postsPost);

router.get("/user", [jwtValidation, fieldsValidator], postsGetUser);

router.get("/userPost", [jwtValidation, fieldsValidator], postsGetByUser);

router.get("/", [jwtValidation, fieldsValidator], postsGet);

module.exports = router;