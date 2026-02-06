/* app imports */
import { TAPIResponse } from "../types/index.js";
import { API_BASE_URL } from "../shared/api-base-url.js";

/* types */
type TInput = {id: number};
type TAlbumDeleteRes = TAPIResponse;

/* module */
async function deleteAlbum(props: TInput): Promise<TAlbumDeleteRes> {
  try {
    if (typeof fetch !== "function") {
      throw new Error("[Bad]: Global Fetch Not Available");
    } else {
      /* setup and fetch */
      const { id } = props;
      const API_URL = `${API_BASE_URL}/albums/${id}`;
      const response = await fetch(API_URL, {method: "DELETE"});

      /* check and return */
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return {
          code: "api-ok",
          message: "Album Deleted Successfully. No Errors Encountered",
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      code: "api-fail",
      message: "[Bad]: Delete Album. Encountered Error.",
    }
  }
}

/* exports */
export type { TAlbumDeleteRes };
export { deleteAlbum };
