const errorHandler = (error, req, res, next) => {
  console.log(error, "<< di error");
  let status = 500;
  let message = "Internal Server Error";

  if (error.name === "SequelizeValidationError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (error.name == "SequelizeDatabaseError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (error.name == "SequelizeForeignKeyConstraintError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (error.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid access_token";
  }

  // customize error

  if (error.name === "imgUrlValidationError") {
    status = 400;
    message = "imgUrl is required";
  }

  if (error.name === "LoginInputValidationError") {
    status = 400;
    message = "Email/Password is required";
  }

  if (error.name === "LoginValidationError") {
    status = 401;
    message = "Invalid Email/Password";
  }

  if (error.name === "Unauthorized") {
    status = 401;
    message = "Unauthorized";
  }

  if (error.name === "Forbidden") {
    status = 403;
    message = "You have no access";
  }

  if (error.name === "NotFound") {
    status = 404;
    message = `Data with id ${error.id} is not found`;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;