/// <reference types="jest" />
import { updateAlbum } from "../update-album.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updateAlbum", () => {
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
      updateAlbum({ id: 1, data: { id: 1, title: "Updated Title", userId: 1 } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Update Album By Id. Encountered Error.",
      payload: { updated: false, album: null }
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
      updateAlbum({ id: 1, data: { id: 1, title: "Updated Title", userId: 1 } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Update Album By Id. Encountered Error.",
      payload: { updated: false, album: null }
    });
  });

  /* #3 */
  test("returns updated false when response ok but album is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updateAlbum({ id: 1, data: { id: 1, title: "Updated Title", userId: 1 } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { updated: false, album: null }
    });
  });

  /* #4 */
  test("returns updated true when response ok and album has data", async () => {
    const mockAlbum = { id: 1, title: "Updated Title", userId: 1 };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockAlbum)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updateAlbum({ id: 1, data: { id: 1, title: "Updated Title", userId: 1 } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { updated: true, album: mockAlbum }
    });
  });

  /* #5 */
  test("targets the album update endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { id: 10, title: "Updated Title", userId: 5 };
    await updateAlbum({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/albums/10",
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
