/// <reference types="jest" />
import { updatePhotoPartial } from "../update-photo-partial.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updatePhotoPartial", () => {
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
      updatePhotoPartial({ id: 1, data: { title: "Updated title" } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Photo By Id. Encountered Error.",
      payload: { patched: false, photo: null }
    });
  });

  /* #2 */
  test("returns api-fail when data is empty", async () => {
    console.error = jest.fn();

    await expect(updatePhotoPartial({ id: 1, data: {} })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Photo By Id. Encountered Error.",
      payload: { patched: false, photo: null }
    });
  });

  /* #3 */
  test("returns api-fail when fetch response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);
    console.error = jest.fn();

    await expect(
      updatePhotoPartial({ id: 1, data: { title: "Updated title" } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Photo By Id. Encountered Error.",
      payload: { patched: false, photo: null }
    });
  });

  /* #4 */
  test("returns patched false when response ok but photo is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updatePhotoPartial({ id: 1, data: { title: "Updated title" } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: false, photo: null }
    });
  });

  /* #5 */
  test("returns patched true when response ok and photo has data", async () => {
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
      updatePhotoPartial({ id: 1, data: { title: "Updated title" } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: true, photo: mockPhoto }
    });
  });

  /* #6 */
  test("targets the photo patch endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { title: "Patched title" };
    await updatePhotoPartial({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos/10",
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
  });
});
