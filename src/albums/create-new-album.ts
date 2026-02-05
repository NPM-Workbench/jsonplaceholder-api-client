/* app imports */
import { TAPIResponse, TNewAlbum } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {title: string, userId: number};
type TNewAlbumRes = TAPIResponse & {
  payload: null | {
    created: boolean,
    album: null | TNewAlbum
  }
};

/* module */
async function createNewAlbum(props: TInput): Promise<TNewAlbumRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/albums`;
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
        const album = await response.json();
        const payload = Object.keys(album).length <= 0 ? {created: false, album: null} : {created: true, album};
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
      message: "[Bad]: Create New Album. Encountered Error.",
      payload: { created: false, album: null }
    }
  }
}

/* exports */
export type { TNewAlbumRes };
export { createNewAlbum };
