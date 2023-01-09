import validator from "validator";

export function usernameValidation(name: string) {
  const errorMessages: string[] = [];

  const maxLength = 24,
    minLength = 3;

  if (!validator.isAlphanumeric(name)) {
    errorMessages.push("Username name may only have letters and numbers");
  }

  if (!validator.isLength(name, { min: minLength, max: maxLength }))
    errorMessages.push(
      `Username name must be between ${minLength} and ${maxLength} length`
    );

  if (errorMessages.length > 0) throw Error(errorMessages.join(", "));
}

export function passwordValidation(password: string) {
  const errorMessages: string[] = [];
  if (!validator.isStrongPassword(password)) {
    errorMessages.push(
      `Password must me strong(min. 1 lower, 1 upper, 1 number, 1 symbol)`
    );
  }

  if (errorMessages.length > 0) throw Error(errorMessages.join(", "));
}

export function birthdayValidation(date: string) {
  const errorMessages: string[] = [];

  if (!validator.isDate(date)) {
    errorMessages.push(`Birthday must be a correct date`);
  }

  if (errorMessages.length > 0) throw Error(errorMessages.join(", "));
}

export function phoneNumberValidation(phone: string) {
  const errorMessages: string[] = [];

  if (!validator.isMobilePhone(phone)) {
    errorMessages.push(`Phone is not a correct phone number`);
  }

  if (errorMessages.length > 0) throw Error(errorMessages.join(", "));
}

export function emailValidation(email: string) {
  const errorMessages: string[] = [];

  if (!validator.isEmail(email)) {
    errorMessages.push(`Email is not a correct e-mail`);
  }

  if (errorMessages.length > 0) throw Error(errorMessages.join(", "));
}
