/* app imports */
import { TAPIResponse, TComment } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TAllCommentsRes = TAPIResponse & { payload: null | TComment[] };

/* module */
async function getAllComments(): Promise<TAllCommentsRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/comments`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const comments = await response.json();
        return {
          code: "api-ok",
          message: "No errors encountered. Check payload.",
          payload: comments
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Get All Comments. Encountered Error.",
      payload: null
    }
  }
}

/* exports */
export type { TAllCommentsRes };
export { getAllComments };
