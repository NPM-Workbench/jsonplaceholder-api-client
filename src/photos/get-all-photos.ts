/* app imports */
import { TAPIResponse, TPhoto } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TAllPhotosRes = TAPIResponse & { payload: null | TPhoto[] };

/* module */
async function getAllPhotos(): Promise<TAllPhotosRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const API_URL = `${API_BASE_URL}/photos`;
      const response = await fetch(API_URL);

      /* check and return */
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const photos = await response.json();
        return {
          code: "api-ok",
          message: "No errors encountered. Check payload.",
          payload: photos
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Get All Photos. Encountered Error.",
      payload: null
    }
  }
}

/* exports */
export type { TAllPhotosRes };
export { getAllPhotos };
