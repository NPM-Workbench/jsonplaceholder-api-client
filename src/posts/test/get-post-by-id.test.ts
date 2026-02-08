/// <reference types="jest" />
import { getPostById } from "../get-post-by-id.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getPostById", () => {
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

    await expect(getPostById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get Post By Id. Encountered Error.",
      payload: { found: false, post: null }
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

    await expect(getPostById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get Post By Id. Encountered Error.",
      payload: { found: false, post: null }
    });
  });

  /* #3 */
  test("returns found false when response ok but post is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getPostById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: false, post: null }
    });
  });

  /* #4 */
  test("returns found true when response ok and post has data", async () => {
    const mockPost = {
      id: 1,
      userId: 1,
      title: "sunt aut facere repellat",
      body: "quia et suscipit"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPost)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getPostById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: true, post: mockPost }
    });
  });

  /* #5 */
  test("targets the post by id endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getPostById({ id: 99 });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/99"
    );
  });
});
