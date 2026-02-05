/* node modules */
import { TAPIResponse, TAlbum } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: { title?: string, userId?: number }
};
type TUpdateAlbumPartialRes = TAPIResponse & {
  payload: null | {
    patched: boolean,
    album: TAlbum | null
  }
};

/* module */
async function updateAlbumPartial(props: TInput): Promise<TUpdateAlbumPartialRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else if (Object.keys(props.data).length <= 0) {
      throw new Error("[Bad]: Need atleast one field for PATCH update.");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/albums/${id}`;
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
        const album = await response.json();
        const payload = Object.keys(album).length <= 0 ? {patched: false, album: null} : {patched: true, album};
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
      message: "[Bad]: Partial Update Album By Id. Encountered Error.",
      payload: { patched: false, album: null }
    }
  }
}

/* exports */
export type { TUpdateAlbumPartialRes };
export { updateAlbumPartial };
