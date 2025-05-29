const { Router } = require("express");
const { globalSearch } = require("../controllers/search");
const jwtValidation = require("../middlewares/jwt_validation");

const router = Router();

router.get("/", [jwtValidation], globalSearch);

module.exports = router;
