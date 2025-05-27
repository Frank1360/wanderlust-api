const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { connection } = require("./database/connection");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.path = {
      auth: "/api/auth",
      comment: "/api/comment",
      favorite: "/api/favorite",
      follow: "/api/follow",
      post: "/api/post",
      user: "/api/user",
      search: "/api/search",
    };

    this.connectionDB();

    this.middlewares();

    this.routes();
  }

  async connectionDB() {
    await connection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("src/public"));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  routes() {
    this.app.use(this.path.auth, require("../src/routes/auth"));
    this.app.use(this.path.comment, require("../src/routes/comments"));
    this.app.use(this.path.follow, require("../src/routes/follower"));
    this.app.use(this.path.favorite, require("../src/routes/favorites"));
    this.app.use(this.path.post, require("../src/routes/posts"));
    this.app.use(this.path.user, require("../src/routes/user"));
    this.app.use(this.path.search, require("../src/routes/search"));
  }

  listen() {
    this.app.listen(this.port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${this.port}`);
});
  }
}

module.exports = Server;
