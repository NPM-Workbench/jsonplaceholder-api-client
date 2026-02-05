/* app imports */
import { TAPIResponse, TNewUser } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {name: string, username: string, email: string};
type TNewUserRes = TAPIResponse & {
  payload: null | {
    created: boolean,
    user: null | TNewUser
  }
};

/* module */
async function createNewUser(props: TInput): Promise<TNewUserRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/users`;
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(props),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const user = await response.json();
        const payload = Object.keys(user).length <= 0 ? {created: false, user: null} : {created: true, user};
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
      message: "[Bad]: Create New User. Encountered Error.",
      payload: { created: false, user: null }
    }
  }
}

/* exports */
export type { TNewUserRes };
export { createNewUser };
