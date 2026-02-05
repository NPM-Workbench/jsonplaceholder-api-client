/* node modules */
import { TAPIResponse, TUser } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: {
    name?: string
    username?: string
    email?: string
    address?: {
      street?: string
      suite?: string
      city?: string
      zipcode?: string
      geo?: {
        lat?: string
        lng?: string
      }
    }
    phone?: string
    website?: string
    company?: {
      name?: string
      catchPhrase?: string
      bs?: string
    }
  }
};
type TUpdateUserPartialRes = TAPIResponse & {
  payload: null | {
    patched: boolean,
    user: TUser | null
  }
};

/* module */
async function updateUserPartial(props: TInput): Promise<TUpdateUserPartialRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else if (Object.keys(props.data).length <= 0) {
      throw new Error("[Bad]: Need atleast one field for PATCH update.");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/users/${id}`;
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
        const user = await response.json();
        const payload = Object.keys(user).length <= 0 ? {patched: false, user: null} : {patched: true, user};
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
      message: "[Bad]: Partial Update User By Id. Encountered Error.",
      payload: { patched: false, user: null }
    }
  }
}

/* exports */
export type { TUpdateUserPartialRes };
export { updateUserPartial };
