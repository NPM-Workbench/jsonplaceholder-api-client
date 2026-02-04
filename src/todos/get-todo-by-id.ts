/* app imports */
import { TAPIResponse, TTodo } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TTodoRes = TAPIResponse & {
  payload: null | {
    found: boolean,
    todo: null | TTodo
  }
};

/* module */
async function getTodoById(props: TInput): Promise<TTodoRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/todos/${id}`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const todo = await response.json();
        const payload = Object.keys(todo).length <= 0 ? {found: false, todo: null} : {found: true, todo};
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
      message: "[Bad]: Get Todo By Id. Encountered Error.",
      payload: { found: false, todo: null }
    }
  }
}

/* exports */
export type { TTodoRes };
export { getTodoById };
