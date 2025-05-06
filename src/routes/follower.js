const { Router } = require("express");
const jwtValidation = require("../middlewares/jwt_validation");
const {
  followPost,
  followingsGet,
  followersGet,
  followingsGetByUser,
  followersGetByUser,
} = require("../controllers/follower");
const fieldsValidator = require("../middlewares/fields");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  [
    check("userId", "El id del usuario a seguir es obligatorio.").notEmpty(),
    jwtValidation,
    fieldsValidator,
  ],
  followPost
);
router.get("/followings", [jwtValidation], followingsGet);
router.get("/followers", [jwtValidation], followersGet);
router.get(
  "/followingsuser",
  [
    check("userId", "El id del usuario es obligatorio.").notEmpty(),
    jwtValidation,
    fieldsValidator,
  ],
  followingsGetByUser
);
router.get(
  "/followersuser",
  [
    check("userId", "El id del usuario es obligatorio.").notEmpty(),
    jwtValidation,
    fieldsValidator,
  ],
  followersGetByUser
);

module.exports = router;
