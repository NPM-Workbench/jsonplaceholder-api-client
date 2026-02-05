/* node modules */
import { TAPIResponse, TComment } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: {id: number, postId: number, name: string, email: string, body: string}
};
type TUpdatedCommentRes = TAPIResponse & {
  payload: null | {
    updated: boolean,
    comment: TComment | null
  }
};

/* module */
async function updateCommentById(props: TInput): Promise<TUpdatedCommentRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/comments/${id}`;
      const response = await fetch(API_URL, {
        method: "PUT",
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
        const payload = Object.keys(comment).length <= 0 ? {updated: false, comment: null} : {updated: true, comment};
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
      message: "[Bad]: Update Comment By Id. Encountered Error.",
      payload: { updated: false, comment: null }
    }
  }
}

/* exports */
export type { TUpdatedCommentRes };
export { updateCommentById };
