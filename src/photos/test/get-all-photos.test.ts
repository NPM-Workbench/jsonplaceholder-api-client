/// <reference types="jest" />
import { getAllPhotos } from "../get-all-photos.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getAllPhotos", () => {
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

    await expect(getAllPhotos()).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get All Photos. Encountered Error.",
      payload: null
    });
  });

  /* #2 */
  test("returns api-fail when fetch response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue([])
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);
    console.error = jest.fn();

    await expect(getAllPhotos()).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get All Photos. Encountered Error.",
      payload: null
    });
  });

  /* #3 */
  test("returns payload when response ok", async () => {
    const mockPayload = [
      {
        id: 1,
        albumId: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952"
      },
      {
        id: 2,
        albumId: 1,
        title: "reprehenderit est deserunt velit ipsam",
        url: "https://via.placeholder.com/600/771796",
        thumbnailUrl: "https://via.placeholder.com/150/771796"
      }
    ];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getAllPhotos()).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: mockPayload
    });
  });

  /* #4 */
  test("targets the photos endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([])
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getAllPhotos();
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos"
    );
  });
});
