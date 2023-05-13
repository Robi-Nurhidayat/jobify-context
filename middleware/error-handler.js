import { json } from "express";

const errorHandlerMiddlerware = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: err });
};

export default errorHandlerMiddlerware;
