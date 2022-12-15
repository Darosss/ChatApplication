import { Request } from "express";

interface RequestUserAuth extends Request {
  user?: {
    id?: string;
  };
}
