/* app imports */
import { TAPIResponse, TPhoto } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TPhotoRes = TAPIResponse & {
  payload: null | {
    found: boolean,
    photo: null | TPhoto
  }
};

/* module */
async function getPhotoById(props: TInput): Promise<TPhotoRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/photos/${id}`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const photo = await response.json();
        const payload = Object.keys(photo).length <= 0 ? {found: false, photo: null} : {found: true, photo};
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
      message: "[Bad]: Get Photo By Id. Encountered Error.",
      payload: { found: false, photo: null }
    }
  }
}

/* exports */
export type { TPhotoRes };
export { getPhotoById };
