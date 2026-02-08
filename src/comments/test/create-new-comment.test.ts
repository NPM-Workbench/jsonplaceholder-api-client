/// <reference types="jest" />
import { createNewComment } from "../create-new-comment.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("createNewComment", () => {
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
      createNewComment({
        postId: 1,
        name: "Test Comment",
        email: "test@example.com",
        body: "Hello"
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Comment. Encountered Error.",
      payload: { created: false, comment: null }
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
      createNewComment({
        postId: 1,
        name: "Test Comment",
        email: "test@example.com",
        body: "Hello"
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Comment. Encountered Error.",
      payload: { created: false, comment: null }
    });
  });

  /* #3 */
  test("returns created false when response ok but comment is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewComment({
        postId: 1,
        name: "Test Comment",
        email: "test@example.com",
        body: "Hello"
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: false, comment: null }
    });
  });

  /* #4 */
  test("returns created true when response ok and comment has data", async () => {
    const mockComment = {
      id: 501,
      postId: 1,
      name: "Test Comment",
      email: "test@example.com",
      body: "Hello"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockComment)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewComment({
        postId: 1,
        name: "Test Comment",
        email: "test@example.com",
        body: "Hello"
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: true, comment: mockComment }
    });
  });

  /* #5 */
  test("targets the comments endpoint with POST body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = {
      postId: 1,
      name: "Test Comment",
      email: "test@example.com",
      body: "Hello"
    };
    await createNewComment(payload);

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/comments",
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
