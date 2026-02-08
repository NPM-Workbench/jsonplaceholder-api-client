/// <reference types="jest" />
import { updateAlbumPartial } from "../update-album-partial.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updateAlbumPartial", () => {
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

    await expect(updateAlbumPartial({ id: 1, data: { title: "New Title" } })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Album By Id. Encountered Error.",
      payload: { patched: false, album: null }
    });
  });

  /* #2 */
  test("returns api-fail when data is empty", async () => {
    console.error = jest.fn();

    await expect(updateAlbumPartial({ id: 1, data: {} })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Album By Id. Encountered Error.",
      payload: { patched: false, album: null }
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

    await expect(updateAlbumPartial({ id: 1, data: { title: "New Title" } })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Album By Id. Encountered Error.",
      payload: { patched: false, album: null }
    });
  });

  /* #4 */
  test("returns patched false when response ok but album is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(updateAlbumPartial({ id: 1, data: { title: "New Title" } })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: false, album: null }
    });
  });

  /* #5 */
  test("returns patched true when response ok and album has data", async () => {
    const mockAlbum = { id: 1, title: "Updated Title", userId: 1 };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockAlbum)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(updateAlbumPartial({ id: 1, data: { title: "Updated Title" } })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: true, album: mockAlbum }
    });
  });

  /* #6 */
  test("targets the album patch endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { title: "Patched Title" };
    await updateAlbumPartial({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/albums/10",
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
