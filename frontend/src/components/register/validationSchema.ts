import { UserRegisterData } from "src/@types/types";
import { object, string, date, number } from "yup";

export const registerSchema = object<UserRegisterData>().shape({
  username: string().required("Required!"),
  password: string()
    .required("Required!")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{4,}$/,
      "Password must contain at least: 1 upper case, 1 lower case, 1 symbol, 1 number.",
    ),
  email: string().email().required("Required!"),
  birthday: date()
    .default(() => new Date())
    .required("Required!"),
  phone: number().required("Required!"),
});
