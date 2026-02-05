/* node modules */
import { TAPIResponse, TAlbum } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: { id: number, title: string, userId: number }
};
type TUpdatedAlbumRes = TAPIResponse & {
  payload: null | {
    updated: boolean,
    album: TAlbum | null
  }
};

/* module */
async function updateAlbumById(props: TInput): Promise<TUpdatedAlbumRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/albums/${id}`;
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
        const album = await response.json();
        const payload = Object.keys(album).length <= 0 ? {updated: false, album: null} : {updated: true, album};
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
      message: "[Bad]: Update Album By Id. Encountered Error.",
      payload: { updated: false, album: null }
    }
  }
}

/* exports */
export type { TUpdatedAlbumRes };
export { updateAlbumById };
