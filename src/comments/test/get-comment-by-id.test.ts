/// <reference types="jest" />
import { getCommentById } from "../get-comment-by-id.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getCommentById", () => {
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

    await expect(getCommentById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get Comment By Id. Encountered Error.",
      payload: { found: false, comment: null }
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

    await expect(getCommentById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get Comment By Id. Encountered Error.",
      payload: { found: false, comment: null }
    });
  });

  /* #3 */
  test("returns found false when response ok but comment is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getCommentById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: false, comment: null }
    });
  });

  /* #4 */
  test("returns found true when response ok and comment has data", async () => {
    const mockComment = {
      id: 1,
      postId: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockComment)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getCommentById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: true, comment: mockComment }
    });
  });

  /* #5 */
  test("targets the comment by id endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getCommentById({ id: 99 });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/comments/99"
    );
  });
});
