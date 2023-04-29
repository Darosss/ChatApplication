import mongoose from "mongoose";

export const initDatabase = async (url: string) => {
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1);
  }
};
