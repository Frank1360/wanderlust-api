const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Correo obligatorio."],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Contraseña obligatorio."],
    },
    firstName: {
      type: String,
      required: [true, "Nombre obligatorio."],
    },
    lastName: {
      type: String,
      required: [true, "Apellido obligatorio."],
    },
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
    },
    interests: [
      {
        interest: {
          type: String,
        },
      },
    ],
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Telefono obligatorio."],
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

module.exports = User;
