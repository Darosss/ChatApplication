import { UserModel, UserDocument, UserWithoutPassword } from "@types";
import { User } from "@/models/user";
import { AppError, handleAppError } from "@/utils/ErrorHandler";
import { FilterQuery, Model, PopulateOptions, ProjectionType } from "mongoose";

type UserCreateData = Omit<
  UserModel,
  | "comparePassword"
  | "comparePassword2"
  | "createdAt"
  | "_id"
  | "ranges"
  | "administrator"
  | "moderator"
  | "isBanned"
  | "bannedData"
  | "banExpiresDate"
  | "bannedDate"
  | "banReason"
>;

class UserService {
  constructor(private readonly userModel: Model<UserDocument>) {
    this.userModel = userModel;
  }
  getUsersList = async (
    filter: FilterQuery<UserWithoutPassword> = {},
    projection: ProjectionType<UserDocument> = {},
    populate?: PopulateOptions
  ): Promise<UserModel[]> => {
    try {
      const users = await this.userModel
        .find(filter, Object.assign(projection, { password: 0 }))
        .populate(populate || []);

      return users;
    } catch (err) {
      console.error(err);
      handleAppError(err);
      return [];
    }
  };

  getUserById = async (
    id: string,
    projection: ProjectionType<UserWithoutPassword> = {},
    populate?: PopulateOptions
  ): Promise<UserModel | null> => {
    try {
      const user = await this.userModel.findById(
        id,
        Object.assign(projection, { password: 0 })
      );
      if (populate) await user?.populate(populate);

      return user;
    } catch (err) {
      console.error(err);
      handleAppError(err);
      return null;
    }
  };

  getOneUser = async (
    projection: FilterQuery<UserDocument> = {},
    populate?: PopulateOptions[]
  ): Promise<UserModel | null> => {
    try {
      const user = await this.userModel.findOne(projection);
      if (populate) await user?.populate(populate);

      return user;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  updateUserById = async (
    id: string,
    updateData: Partial<UserWithoutPassword>
  ): Promise<UserModel | null> => {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new AppError(404, "User not found");
      }
      const existingUser = await this.userModel.findOne({
        username: updateData.username,
        _id: { $ne: user.id },
      });

      if (existingUser) {
        throw new AppError(409, "Account with that username already exists");
      }

      Object.assign(user, updateData);
      await user.save();
      return user;
    } catch (err) {
      console.error(err);
      handleAppError(err);
      return null;
    }
  };

  createNewUser = async (
    createData: UserCreateData
  ): Promise<boolean | null> => {
    try {
      const user = await this.getOneUser({ username: createData.username });
      if (user) {
        throw new AppError(409, "Account with that username already exists");
      }

      await this.userModel.create(createData);

      return true;
    } catch (err) {
      console.error(err);
      handleAppError(err);
      return null;
    }
  };

  updateUserPassword = async (
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    const user = await this.userModel.findById(id);

    if (!user) return false;

    try {
      if (await user.comparePassword(oldPassword)) {
        user.password = newPassword;
        await user.save();

        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      handleAppError(err);
      return false;
    }
  };
}

const userService = new UserService(User);

export { userService, UserService, UserCreateData };
