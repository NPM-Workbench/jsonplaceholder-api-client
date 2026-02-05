/* node modules */
import { TAPIResponse, TPhoto } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: { albumId?: number, title?: string, url?: string, thumbnailUrl?: string }
};
type TUpdatePhotoPartialRes = TAPIResponse & {
  payload: null | {
    patched: boolean,
    photo: TPhoto | null
  }
};

/* module */
async function updatePhotoPartial(props: TInput): Promise<TUpdatePhotoPartialRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else if (Object.keys(props.data).length <= 0) {
      throw new Error("[Bad]: Need atleast one field for PATCH update.");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/photos/${id}`;
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
        const photo = await response.json();
        const payload = Object.keys(photo).length <= 0 ? {patched: false, photo: null} : {patched: true, photo};
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
      message: "[Bad]: Partial Update Photo By Id. Encountered Error.",
      payload: { patched: false, photo: null }
    }
  }
}

/* exports */
export type { TUpdatePhotoPartialRes };
export { updatePhotoPartial };
