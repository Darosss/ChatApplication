import { UserUpdateData } from "src/@types/types";
import { object, string, date, number } from "yup";

export const editUserSchema = object<UserUpdateData>().shape({
  username: string()
    .min(3, "Username is too short - should be 3 chars minimum.")
    .max(24, "Username can't be longer than 24")
    .required("Required!"),
  email: string().email().required("Required!"),
  birthday: date()
    .default(() => new Date())
    .required("Required!"),
  phone: number().required("Required!"),
});
