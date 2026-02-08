/// <reference types="jest" />
import { createNewPost } from "../create-new-post.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("createNewPost", () => {
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
      createNewPost({
        userId: 1,
        title: "Test Post",
        body: "Hello world"
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Post. Encountered Error.",
      payload: { created: false, post: null }
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
      createNewPost({
        userId: 1,
        title: "Test Post",
        body: "Hello world"
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Post. Encountered Error.",
      payload: { created: false, post: null }
    });
  });

  /* #3 */
  test("returns created false when response ok but post is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewPost({
        userId: 1,
        title: "Test Post",
        body: "Hello world"
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: false, post: null }
    });
  });

  /* #4 */
  test("returns created true when response ok and post has data", async () => {
    const mockPost = { id: 101, userId: 1, title: "Test Post", body: "Hello world" };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPost)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewPost({
        userId: 1,
        title: "Test Post",
        body: "Hello world"
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: true, post: mockPost }
    });
  });

  /* #5 */
  test("targets the posts endpoint with POST body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { userId: 1, title: "Test Post", body: "Hello world" };
    await createNewPost(payload);

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
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
