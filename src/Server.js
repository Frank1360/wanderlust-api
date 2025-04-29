const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.path = {};

    this.middlewares();

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

  routes(){}

  listen(){
    this.app.listen(this.port, () => {
        console.log(`Servidor corriendo en puerto: ${this.port}`)
    })
  }
}

module.exports = Server;