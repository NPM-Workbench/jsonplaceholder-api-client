/* app imports */
import { TAPIResponse, TNewPost } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {userId: number, title: string, body: string};
type TNewPostRes = TAPIResponse & {
  payload: null | {
    created: boolean,
    post: null | TNewPost
  }
};

/* module */
async function createNewPost(props: TInput): Promise<TNewPostRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/posts`;
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
        const post = await response.json();
        const payload = Object.keys(post).length <= 0 ? {created: false, post: null} : {created: true, post};
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
      message: "[Bad]: Create New Post. Encountered Error.",
      payload: { created: false, post: null }
    }
  }
}

/* exports */
export type { TNewPostRes };
export { createNewPost };
