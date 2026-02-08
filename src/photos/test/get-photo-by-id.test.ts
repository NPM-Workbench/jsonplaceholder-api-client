/// <reference types="jest" />
import { getPhotoById } from "../get-photo-by-id.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getPhotoById", () => {
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

    await expect(getPhotoById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get Photo By Id. Encountered Error.",
      payload: { found: false, photo: null }
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

    await expect(getPhotoById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get Photo By Id. Encountered Error.",
      payload: { found: false, photo: null }
    });
  });

  /* #3 */
  test("returns found false when response ok but photo is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getPhotoById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: false, photo: null }
    });
  });

  /* #4 */
  test("returns found true when response ok and photo has data", async () => {
    const mockPhoto = {
      id: 1,
      albumId: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPhoto)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getPhotoById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: true, photo: mockPhoto }
    });
  });

  /* #5 */
  test("targets the photo by id endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getPhotoById({ id: 99 });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos/99"
    );
  });
});
