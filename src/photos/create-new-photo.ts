/* app imports */
import { TAPIResponse, TNewPhoto } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {albumId: number, title: string, url: string, thumbnailUrl: string};
type TNewPhotoRes = TAPIResponse & {
  payload: null | {
    created: boolean,
    photo: null | TNewPhoto
  }
};

/* module */
async function createNewPhoto(props: TInput): Promise<TNewPhotoRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/photos`;
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
        const photo = await response.json();
        const payload = Object.keys(photo).length <= 0 ? {created: false, photo: null} : {created: true, photo};
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
      message: "[Bad]: Create New Photo. Encountered Error.",
      payload: { created: false, photo: null }
    }
  }
}

/* exports */
export type { TNewPhotoRes };
export { createNewPhoto };
