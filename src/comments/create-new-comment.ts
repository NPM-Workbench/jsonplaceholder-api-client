/* app imports */
import { TAPIResponse, TNewComment } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {postId: number, name: string, email: string, body: string};
type TNewCommentRes = TAPIResponse & {
  payload: null | {
    created: boolean,
    comment: null | TNewComment
  }
};

/* module */
async function createNewComment(props: TInput): Promise<TNewCommentRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/comments`;
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
        const comment = await response.json();
        const payload = Object.keys(comment).length <= 0 ? {created: false, comment: null} : {created: true, comment};
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
      message: "[Bad]: Create New Comment. Encountered Error.",
      payload: { created: false, comment: null }
    }
  }
}

/* exports */
export type { TNewCommentRes };
export { createNewComment };
