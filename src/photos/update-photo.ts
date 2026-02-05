/* node modules */
import { TAPIResponse, TPhoto } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {
  id: number,
  data: { id: number, albumId: number, title: string, url: string, thumbnailUrl: string }
};
type TUpdatePhotoRes = TAPIResponse & {
  payload: null | {
    updated: boolean,
    photo: TPhoto | null
  }
};

/* module */
async function updatePhoto(props: TInput): Promise<TUpdatePhotoRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/photos/${id}`;
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
        const photo = await response.json();
        const payload = Object.keys(photo).length <= 0 ? {updated: false, photo: null} : {updated: true, photo};
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
      message: "[Bad]: Update Photo By Id. Encountered Error.",
      payload: { updated: false, photo: null }
    }
  }
}

/* exports */
export type { TUpdatePhotoRes };
export { updatePhoto };
