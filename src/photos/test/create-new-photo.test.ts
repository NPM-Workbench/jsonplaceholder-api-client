/// <reference types="jest" />
import { createNewPhoto } from "../create-new-photo.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("createNewPhoto", () => {
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
      createNewPhoto({
        albumId: 1,
        title: "Test Photo",
        url: "https://example.com/photo.jpg",
        thumbnailUrl: "https://example.com/thumb.jpg"
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Photo. Encountered Error.",
      payload: { created: false, photo: null }
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
      createNewPhoto({
        albumId: 1,
        title: "Test Photo",
        url: "https://example.com/photo.jpg",
        thumbnailUrl: "https://example.com/thumb.jpg"
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Photo. Encountered Error.",
      payload: { created: false, photo: null }
    });
  });

  /* #3 */
  test("returns created false when response ok but photo is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewPhoto({
        albumId: 1,
        title: "Test Photo",
        url: "https://example.com/photo.jpg",
        thumbnailUrl: "https://example.com/thumb.jpg"
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: false, photo: null }
    });
  });

  /* #4 */
  test("returns created true when response ok and photo has data", async () => {
    const mockPhoto = {
      id: 501,
      albumId: 1,
      title: "Test Photo",
      url: "https://example.com/photo.jpg",
      thumbnailUrl: "https://example.com/thumb.jpg"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPhoto)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewPhoto({
        albumId: 1,
        title: "Test Photo",
        url: "https://example.com/photo.jpg",
        thumbnailUrl: "https://example.com/thumb.jpg"
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: true, photo: mockPhoto }
    });
  });

  /* #5 */
  test("targets the photos endpoint with POST body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = {
      albumId: 1,
      title: "Test Photo",
      url: "https://example.com/photo.jpg",
      thumbnailUrl: "https://example.com/thumb.jpg"
    };
    await createNewPhoto(payload);

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos",
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
