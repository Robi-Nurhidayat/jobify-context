import { StatusCodes } from "http-status-codes";

const errorHandlerMiddlerware = (err, req, res, next) => {
  console.log(err.message);

  const defaultError = {
    StatusCodes: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err.name === "ValidationError") {
    // defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;

    defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (err.code && err.code === 11000) {
    defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
    defaultError.msg = "Field has to be unique";
  }


  res.status(defaultError.StatusCodes).json({ msg: defaultError.msg });
};

export default errorHandlerMiddlerware;
