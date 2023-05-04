import { faker } from "@faker-js/faker";

export const getFakerUserData = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    username: faker.internet.userName("Random"),
    password: faker.internet.password(30, false, /\w/, "!Za"),
    firstname: faker.name.firstName(),
    surname: faker.name.lastName(),
    birthday: faker.date.past(),
    country: faker.address.country(),
    gender: faker.name.sex(),
    nickColor: faker.color.human(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number("#########"),
  };
};
