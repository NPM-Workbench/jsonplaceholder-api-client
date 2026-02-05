/* node modules */
import { TAPIResponse, TComment } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: {postId?: number, name?: string, email?: string, body?: string}
};
type TUpdateCommentPartialRes = TAPIResponse & {
  payload: null | {
    patched: boolean,
    comment: TComment | null
  }
};

/* module */
async function updateCommentPartial(props: TInput): Promise<TUpdateCommentPartialRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else if (Object.keys(props.data).length <= 0) {
      throw new Error("[Bad]: Need atleast one field for PATCH update.");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/comments/${id}`;
      const response = await fetch(API_URL, {
        method: "PATCH",
        body: JSON.stringify(props.data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const comment = await response.json();
        const payload = Object.keys(comment).length <= 0 ? {patched: false, comment: null} : {patched: true, comment};
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
      message: "[Bad]: Partial Update Comment By Id. Encountered Error.",
      payload: { patched: false, comment: null }
    }
  }
}

/* exports */
export type { TUpdateCommentPartialRes };
export { updateCommentPartial };
