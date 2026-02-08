/// <reference types="jest" />
import { createNewAlbum } from "../create-new-album.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("createNewAlbum", () => {
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

    await expect(createNewAlbum({ title: "New Album", userId: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Album. Encountered Error.",
      payload: { created: false, album: null }
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

    await expect(createNewAlbum({ title: "New Album", userId: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Album. Encountered Error.",
      payload: { created: false, album: null }
    });
  });

  /* #3 */
  test("returns created false when response ok but album is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(createNewAlbum({ title: "New Album", userId: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: false, album: null }
    });
  });

  /* #4 */
  test("returns created true when response ok and album has data", async () => {
    const mockAlbum = { id: 101, title: "New Album", userId: 1 };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockAlbum)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(createNewAlbum({ title: "New Album", userId: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: true, album: mockAlbum }
    });
  });

  /* #5 */
  test("targets the albums endpoint with POST body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { title: "New Album", userId: 1 };
    await createNewAlbum(payload);

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/albums",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
  });
});
