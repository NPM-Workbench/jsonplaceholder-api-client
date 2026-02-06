/* app imports */
import { TAPIResponse } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TCommentDeleteRes = TAPIResponse;

/* module */
async function deleteComment(props: TInput): Promise<TCommentDeleteRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/comments/${id}`;
      const response = await fetch(API_URL, {method: "DELETE"});

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return {
          code: "api-ok",
          message: "Comment Deleted Successfully. No Errors Encountered",
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Delete Comment. Encountered Error.",
    }
  }
}

/* exports */
export type { TCommentDeleteRes };
export { deleteComment };
