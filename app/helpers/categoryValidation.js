
const nameSchema = {
  notEmpty: {
    errorMessage: "Name should not be Empty",
  }
}

const urlSchema = {
  notEmpty: {
    errorMessage: "Url should not be Empty",
  }
}

//categoryValidation
const categoryValidationSchema = {
  name: nameSchema,
  url: urlSchema,
}

module.exports = { categoryValidationSchema }