/* app imports */
import { TAPIResponse, TAlbum } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TAllAlbumsRes = TAPIResponse & { payload: null | TAlbum[] };

/* module */
async function getAllAlbums(): Promise<TAllAlbumsRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/albums`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const albums = await response.json();
        return {
          code: "api-ok",
          message: "No errors encountered. Check payload.",
          payload: albums
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Get All Comments. Encountered Error.",
      payload: null
    }
  }
}

/* exports */
export type { TAllAlbumsRes };
export { getAllAlbums };
