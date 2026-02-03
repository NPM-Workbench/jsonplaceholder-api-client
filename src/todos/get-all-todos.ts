/* app imports */
import { TAPIResponse, TTodo } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TAllTodosRes = TAPIResponse & { payload: null | TTodo[] };

/* module */
async function getAllTodos(): Promise<TAllTodosRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/todos`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const todos = await response.json();
        return {
          code: "api-ok",
          message: "No errors encountered. Check payload.",
          payload: todos
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Get All Todos. Encountered Error.",
      payload: null
    }
  }
}

/* exports */
export type { TAllTodosRes };
export { getAllTodos };
