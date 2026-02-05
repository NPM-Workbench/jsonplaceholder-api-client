/* app imports */
import { TAPIResponse, TNewTodo } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {userId: number, title: string, completed: boolean};
type TNewTodoRes = TAPIResponse & {
  payload: null | {
    created: boolean,
    todo: null | TNewTodo
  }
};

/* module */
async function createNewTodo(props: TInput): Promise<TNewTodoRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/todos`;
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
        const todo = await response.json();
        const payload = Object.keys(todo).length <= 0 ? {created: false, todo: null} : {created: true, todo};
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
      message: "[Bad]: Create New Todo. Encountered Error.",
      payload: { created: false, todo: null }
    }
  }
}

/* exports */
export type { TNewTodoRes };
export { createNewTodo };
