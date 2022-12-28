import { User } from "@/models/user";

export default async function (userId: string) {
  const loggedUser = await User.findById(userId);
  if (loggedUser?.administrator) return true;
}
