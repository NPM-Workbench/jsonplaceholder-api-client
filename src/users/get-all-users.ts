/* app imports */
import { TAPIResponse, TUser } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TAllUsersRes = TAPIResponse & { payload: null | TUser[] };

/* module */
async function getAllUsers(): Promise<TAllUsersRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/users`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const users = await response.json();
        return {
          code: "api-ok",
          message: "No errors encountered. Check payload.",
          payload: users
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Get All Users. Encountered Error.",
      payload: null
    }
  }
}

/* exports */
export type { TAllUsersRes };
export { getAllUsers };
