/// <reference types="jest" />
import { updatePhoto } from "../update-photo.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updatePhoto", () => {
  const originalFetch = (global as any).fetch;
  const originalConsoleError = console.error;

  afterEach(() => {
    if (originalFetch) (global as any).fetch = originalFetch;
    else delete (global as any).fetch;
    console.error = originalConsoleError;
    jest.restoreAllMocks();
  });

  /* #1 */
  test("returns api-fail when global fetch is unavailable", async () => {
    delete (global as any).fetch;
    console.error = jest.fn();

    await expect(
      updatePhoto({
        id: 1,
        data: {
          id: 1,
          albumId: 1,
          title: "Updated title",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952"
        }
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Update Photo By Id. Encountered Error.",
      payload: { updated: false, photo: null }
    });
  });

  /* #2 */
  test("returns api-fail when fetch response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);
    console.error = jest.fn();

    await expect(
      updatePhoto({
        id: 1,
        data: {
          id: 1,
          albumId: 1,
          title: "Updated title",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952"
        }
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Update Photo By Id. Encountered Error.",
      payload: { updated: false, photo: null }
    });
  });

  /* #3 */
  test("returns updated false when response ok but photo is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updatePhoto({
        id: 1,
        data: {
          id: 1,
          albumId: 1,
          title: "Updated title",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952"
        }
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { updated: false, photo: null }
    });
  });

  /* #4 */
  test("returns updated true when response ok and photo has data", async () => {
    const mockPhoto = {
      id: 1,
      albumId: 1,
      title: "Updated title",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPhoto)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updatePhoto({
        id: 1,
        data: {
          id: 1,
          albumId: 1,
          title: "Updated title",
          url: "https://via.placeholder.com/600/92c952",
          thumbnailUrl: "https://via.placeholder.com/150/92c952"
        }
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { updated: true, photo: mockPhoto }
    });
  });

  /* #5 */
  test("targets the photo update endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = {
      id: 10,
      albumId: 1,
      title: "Updated title",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    };
    await updatePhoto({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos/10",
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
  });
});
