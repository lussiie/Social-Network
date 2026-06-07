import { Http } from "../config/api";

export const checkUsernameExists = async (username: string): Promise<boolean> => {
  try {
    const res = await Http.get(`/users/exists`, { params: { username } });
    return res.data.exists;
  } catch (e) {
    return false;
  }
};
