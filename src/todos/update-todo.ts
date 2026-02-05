/* node modules */
import { TAPIResponse, TTodo } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: { id: number, userId: number, title: string, completed: boolean }
};
type TUpdateTodoRes = TAPIResponse & {
  payload: null | {
    updated: boolean,
    todo: TTodo | null
  }
};

/* module */
async function updateTodo(props: TInput): Promise<TUpdateTodoRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/todos/${id}`;
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
        const todo = await response.json();
        const payload = Object.keys(todo).length <= 0 ? {updated: false, todo: null} : {updated: true, todo};
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
      message: "[Bad]: Update Todo By Id. Encountered Error.",
      payload: { updated: false, todo: null }
    }
  }
}

/* exports */
export type { TUpdateTodoRes };
export { updateTodo };
