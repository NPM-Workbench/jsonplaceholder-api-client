/* app imports */
import { TAPIResponse } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TPhotoDeleteRes = TAPIResponse;

/* module */
async function deletePhoto(props: TInput): Promise<TPhotoDeleteRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/photos/${id}`;
      const response = await fetch(API_URL, {method: "DELETE"});

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return {
          code: "api-ok",
          message: "Photo Deleted Successfully. No Errors Encountered",
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Delete Photo. Encountered Error.",
    }
  }
}

/* exports */
export type { TPhotoDeleteRes };
export { deletePhoto };
