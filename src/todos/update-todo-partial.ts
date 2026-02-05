/* node modules */
import { TAPIResponse, TTodo } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: { userId?: number, title?: string, completed?: boolean }
};
type TUpdateTodoPartialRes = TAPIResponse & {
  payload: null | {
    patched: boolean,
    todo: TTodo | null
  }
};

/* module */
async function updateTodoPartial(props: TInput): Promise<TUpdateTodoPartialRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else if (Object.keys(props.data).length <= 0) {
      throw new Error("[Bad]: Need atleast one field for PATCH update.");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/todos/${id}`;
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
        const todo = await response.json();
        const payload = Object.keys(todo).length <= 0 ? {patched: false, todo: null} : {patched: true, todo};
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
      message: "[Bad]: Partial Update Todo By Id. Encountered Error.",
      payload: { patched: false, todo: null }
    }
  }
}

/* exports */
export type { TUpdateTodoPartialRes };
export { updateTodoPartial };
