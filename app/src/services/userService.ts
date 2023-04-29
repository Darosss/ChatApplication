import { IUser, IUserDocument } from "@types";
import { User } from "@/models/user";
import { handleAppError } from "@/utils/ErrorHandler";
import { FilterQuery, Model, PopulateOptions, ProjectionType } from "mongoose";

type UserWithoutPassword = Omit<IUser, "password">;

type UserCreateData = Omit<
  IUser,
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
  constructor(private readonly userModel: Model<IUserDocument>) {
    this.userModel = userModel;
  }
  getUsersList = async (
    filter: FilterQuery<UserWithoutPassword> = {},
    projection: ProjectionType<IUserDocument> = {},
    populate?: PopulateOptions
  ): Promise<IUser[]> => {
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
  ): Promise<IUser | null> => {
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

  updateUserById = async (
    id: string,
    updateData: Partial<UserWithoutPassword>
  ): Promise<IUser | null> => {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateData, {
        runValidators: true,
      });

      return user;
    } catch (err) {
      console.error(err);
      handleAppError(err);
      return null;
    }
  };

  createNewUser = async (
    username: string,
    createData: UserCreateData
  ): Promise<string | undefined | null> => {
    try {
      this.userModel.findOne(
        { username: username },
        async (err: Error, doc: Array<object>) => {
          if (err) throw err;
          if (doc) return "User already exist with same username";
          if (!doc) {
            await this.userModel.create(createData);
            return "Account created successfully";
          }
        }
      );
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
      if (await user.comparePassword2(oldPassword)) {
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
