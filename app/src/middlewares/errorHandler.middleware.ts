import { IMongooseError, RequestUserAuth } from "@types";
import { NextFunction, Response } from "express";

export default function errorHandlerMiddleware(
  error: IMongooseError,
  req: RequestUserAuth,
  res: Response,
  // As documentation says - 4 arguments are needed for error handler to work
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (!(error instanceof Error)) {
    res.status(400).send({ message: "400" });
  }

  if (error.code && error.code === 11000) {
    duplicateErrorHandler(error, res);
  } else if (error.name === "ValidationError") {
    validationErrorHandler(error, res);
  } else if (error.name === "CastError") {
    castErrorHandler(error, res);
  } else {
    res.status(500).send({ message: "An unknown error occured!" });
  }
}

function duplicateErrorHandler(error: IMongooseError, res: Response) {
  const fields = Object.keys(error.keyValue);
  res.status(409).send({
    message: `An entered ${fields} already exist`,
    fields: fields,
  });
}

function validationErrorHandler(error: IMongooseError, res: Response) {
  const errors = Object.values(error.errors).map((err) => err.message);
  const fields = Object.values(error.errors).map((err) => err.path);

  res.status(400).send({ message: `${errors?.join(", ")}`, fields: fields });
}

function castErrorHandler(error: IMongooseError, res: Response) {
  res.status(400).send({ message: `${error.message}` });
}
