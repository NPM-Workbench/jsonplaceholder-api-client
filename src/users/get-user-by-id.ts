/* app imports */
import { TAPIResponse, TUser } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TUserRes = TAPIResponse & {
  payload: null | {
    found: boolean,
    user: null | TUser
  }
};

/* module */
async function getUserById(props: TInput): Promise<TUserRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/users/${id}`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const user = await response.json();
        const payload = Object.keys(user).length <= 0 ? {found: false, user: null} : {found: true, user};
        return {
          code: "api-ok",
          message: "No errors encountered. Check payload.",
          payload
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Get User By Id. Encountered Error.",
      payload: { found: false, user: null }
    }
  }
}

/* exports */
export type { TUserRes };
export { getUserById };
