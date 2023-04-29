import { IRange, IRangeDocument } from "@types";
import { Range } from "@/models/range";
import { handleAppError } from "@/utils/ErrorHandler";
import { FilterQuery, Model, PopulateOptions, ProjectionType } from "mongoose";

type RangeCreateData = Omit<IRange, "_id" | "createdAt">;
class RangeService {
  constructor(private readonly rangeModel: Model<IRangeDocument>) {}
  getRangesList = async (
    filter: FilterQuery<IRangeDocument> = {},
    projection: ProjectionType<IRangeDocument> = {},
    populate?: PopulateOptions
  ): Promise<IRange[]> => {
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
    projection: ProjectionType<IRangeDocument> = {},
    populate?: PopulateOptions
  ): Promise<IRange | null> => {
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

  upadeRangeById = async (
    id: string,
    updateData: Partial<IRange>
  ): Promise<IRange | null> => {
    try {
      const range = await this.rangeModel.findByIdAndUpdate(id, updateData, {
        runValidators: true,
      });

      return range;
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };

  createNewRange = async (createData: RangeCreateData) => {
    try {
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
      await this.rangeModel.remove({ id: id });
    } catch (error) {
      console.error(error);
      handleAppError(error);
      return null;
    }
  };
}

export const rangeService = new RangeService(Range);
export type { RangeService };
