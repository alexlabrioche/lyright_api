const yup = require("yup");

const loginUserSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Le nom est trop court")
    .max(100, "Le nom est trop long")
    .required("Le nom est requis"),
  email: yup
    .string()
    .email("Ce n'est pas un email")
    .min(2, "L'email est trop court")
    .max(100, "L'email est trop long")
    .required("L'email est requis"),
});

module.exports = loginUserSchema;
