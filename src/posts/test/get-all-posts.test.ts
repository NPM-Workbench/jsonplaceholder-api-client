/// <reference types="jest" />
import { getAllPosts } from "../get-all-posts.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getAllPosts", () => {
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

    await expect(getAllPosts()).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get All Posts. Encountered Error.",
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

    await expect(getAllPosts()).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get All Posts. Encountered Error.",
      payload: null
    });
  });

  /* #3 */
  test("returns payload when response ok", async () => {
    const mockPayload = [
      { id: 1, userId: 1, title: "sunt aut facere repellat", body: "quia et suscipit" },
      { id: 2, userId: 1, title: "qui est esse", body: "est rerum tempore vitae" }
    ];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getAllPosts()).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: mockPayload
    });
  });

  /* #4 */
  test("targets the posts endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([])
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getAllPosts();
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    );
  });
});
