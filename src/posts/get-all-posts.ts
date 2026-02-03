/* app imports */
import { TAPIResponse, TPost } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TAllPostsRes = TAPIResponse & { payload: null | TPost[] };

/* module */
async function getAllPosts(): Promise<TAllPostsRes> {
  try {
    /* setup and fetch */
    const API_URL = `${API_BASE_URL}/posts`;
    const response = await fetch(API_URL);

    /* check and return */
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const posts = await response.json();
      return {
        code: "api-ok",
        message: "No errors encountered. Check payload.",
        payload: posts
      };
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Get All Posts. Encountered Error.",
      payload: null
    }
  }
}

/* exports */
export type { TAllPostsRes };
export { getAllPosts };
