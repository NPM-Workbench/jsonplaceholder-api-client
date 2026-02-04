/* app imports */
import { TAPIResponse, TAlbum } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TAlbumsRes = TAPIResponse & {
  payload: null | {
    found: boolean,
    album: null | TAlbum
  }
};

/* module */
async function getAlbumById(props: TInput): Promise<TAlbumsRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/albums/${id}`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const album = await response.json();
        const payload = Object.keys(album).length <= 0 ? {found: false, album: null} : {found: true, album};
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
      message: "[Bad]: Get Album By Id. Encountered Error.",
      payload: { found: false, album: null }
    }
  }
}

/* exports */
export type { TAlbumsRes };
export { getAlbumById };
