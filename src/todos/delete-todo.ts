/* app imports */
import { TAPIResponse } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TTodoDeleteRes = TAPIResponse;

/* module */
async function deleteTodo(props: TInput): Promise<TTodoDeleteRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/todos/${id}`;
      const response = await fetch(API_URL, {method: "DELETE"});

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return {
          code: "api-ok",
          message: "Todo Deleted Successfully. No Errors Encountered",
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Delete Todo. Encountered Error.",
    }
  }
}

/* exports */
export type { TTodoDeleteRes };
export { deleteTodo };
