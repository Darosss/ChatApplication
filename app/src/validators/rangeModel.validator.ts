import validator from "validator";

export function nameValidation(name: string) {
  const errorMessages: string[] = [];
  const maxLength = 24,
    minLength = 3;

  if (!validator.isAlphanumeric(name)) {
    errorMessages.push("Room name may only have letters and numbers");
  }

  if (!validator.isLength(name, { min: minLength, max: maxLength }))
    errorMessages.push(
      `Range name must be between ${minLength} and ${maxLength} length`
    );

  if (errorMessages.length > 0) throw Error(errorMessages.join(", "));
}
