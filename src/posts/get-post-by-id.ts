/* app imports */
import { TAPIResponse, TPost } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TPostRes = TAPIResponse & {
  payload: null | {
    found: boolean,
    post: null | TPost
  }
};

/* module */
async function getPostById(props: TInput): Promise<TPostRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/posts/${id}`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const post = await response.json();
        const payload = Object.keys(post).length <= 0 ? {found: false, post: null} : {found: true, post};
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
      message: "[Bad]: Get Post By Id. Encountered Error.",
      payload: { found: false, post: null }
    }
  }
}

/* exports */
export type { TPostRes };
export { getPostById };
