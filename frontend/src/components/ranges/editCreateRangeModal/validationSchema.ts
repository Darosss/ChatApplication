import { object, string } from "yup";

export const rangeSchema = object<RangeUpdateData>().shape({
  name: string()
    .required("Required!")
    .min(3, "Range name is too short - should be 3 chars minimum.")
    .max(24, "Range name can't be longer than 24"),
});
