/* node modules */
import { TAPIResponse, TPost } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: { id: number, userId: number, title: string, body: string }
};
type TUpdatedPostRes = TAPIResponse & {
  payload: null | {
    updated: boolean,
    post: TPost | null
  }
};

/* module */
async function updatePostById(props: TInput): Promise<TUpdatedPostRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/posts/${id}`;
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
        const post = await response.json();
        const payload = Object.keys(post).length <= 0 ? {updated: false, post: null} : {updated: true, post};
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
      message: "[Bad]: Update Post By Id. Encountered Error.",
      payload: { updated: false, post: null }
    }
  }
}

/* exports */
export type { TUpdatedPostRes };
export { updatePostById };
