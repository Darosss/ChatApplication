import { LoginFields } from "src/@types/types";
import { object, string } from "yup";

export const logInSchema = object<LoginFields>().shape({
  username: string().required("Required!"),
  password: string().required("Required!"),
});
