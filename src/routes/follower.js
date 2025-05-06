const { Router } = require("express");
const jwtValidation = require("../middlewares/jwt_validation");
const { followPost, followingsGet, followersGet, followingsGetByUser, followersGetByUser } = require("../controllers/follower");

const router = Router();

router.post('/', [jwtValidation], followPost);
router.get('/followings', [jwtValidation], followingsGet);
router.get('/followers', [jwtValidation], followersGet);
router.get('/followingsuser', [jwtValidation], followingsGetByUser);
router.get('/followersuser', [jwtValidation], followersGetByUser);

module.exports = router;
