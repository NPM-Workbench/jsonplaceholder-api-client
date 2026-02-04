/* app imports */
import { TAPIResponse, TComment } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TCommentRes = TAPIResponse & {
  payload: null | {
    found: boolean,
    comment: null | TComment
  }
};

/* module */
async function getCommentById(props: TInput): Promise<TCommentRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/comments/${id}`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const comment = await response.json();
        const payload = Object.keys(comment).length <= 0 ? {found: false, comment: null} : {found: true, comment};
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
      message: "[Bad]: Get Comment By Id. Encountered Error.",
      payload: { found: false, comment: null }
    }
  }
}

/* exports */
export type { TCommentRes };
export { getCommentById };
