import { RangeModel, RangeDocument } from "@types";
import { Range } from "@/models/range";
import { AppError, handleAppError } from "@/utils/ErrorHandler";
import { FilterQuery, Model, PopulateOptions, ProjectionType } from "mongoose";

type RangeCreateData = Omit<RangeModel, "_id" | "createdAt">;
class RangeService {
  constructor(private readonly rangeModel: Model<RangeDocument>) {}
  getRangesList = async (
    filter: FilterQuery<RangeDocument> = {},
    projection: ProjectionType<RangeDocument> = {},
    populate?: PopulateOptions
  ): Promise<RangeModel[]> => {
    try {
      const ranges = await this.rangeModel
        .find(filter, projection)
        .populate(populate || []);

      return ranges;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return [];
    }
  };

  getRangeById = async (
    id: string,
    projection: ProjectionType<RangeDocument> = {},
    populate?: PopulateOptions
  ): Promise<RangeModel | null> => {
    try {
      const range = await this.rangeModel.findById(id, projection);
      if (populate) await range?.populate(populate);

      return range;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  getOneRange = async (
    projection: FilterQuery<RangeDocument> = {},
    populate?: PopulateOptions[]
  ): Promise<RangeModel | null> => {
    try {
      const range = await this.rangeModel.findOne(projection);
      if (populate) await range?.populate(populate);

      return range;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  upadeRangeById = async (
    id: string,
    updateData: Partial<RangeModel>
  ): Promise<RangeModel | null> => {
    try {
      const range = await this.rangeModel.findById(id);

      if (!range) {
        throw new AppError(404, "Range not found");
      }
      const existingRange = await this.rangeModel.findOne({
        name: updateData.name,
        _id: { $ne: range.id },
      });

      if (existingRange) {
        throw new AppError(409, "Range with that name already exists");
      }

      Object.assign(range, updateData);
      await range.save();
      return range;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  createNewRange = async (createData: RangeCreateData) => {
    try {
      const existRange = await this.getOneRange({ name: createData.name });
      if (existRange) {
        throw new AppError(409, "Range with that name already exists");
      }

      const newRange = await this.rangeModel.create(createData);

      return newRange;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  removeRangeById = async (id: string) => {
    try {
      await this.rangeModel.findByIdAndDelete({ _id: id });
    } catch (error) {
      handleAppError(error);
      return null;
    }
  };
}

export const rangeService = new RangeService(Range);
export type { RangeService };
