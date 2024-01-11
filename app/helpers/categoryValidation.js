
const nameSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name should not be Empty",
      bail: true
    },
  }
}

const urlSchema = {
  url: {
    notEmpty: {
      errorMessage: "Url should not be Empty",
      bail: true
    }
  }
}

//categoryValidation
const categoryValidationSchema = {
  name: nameSchema,
  url: urlSchema,
}

module.exports = categoryValidationSchema