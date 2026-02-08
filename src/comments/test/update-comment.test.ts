/// <reference types="jest" />
import { updateComment } from "../update-comment.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updateComment", () => {
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
      updateComment({
        id: 1,
        data: {
          id: 1,
          postId: 1,
          name: "id labore ex et quam laborum",
          email: "Eliseo@gardner.biz",
          body: "Updated comment"
        }
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Update Comment By Id. Encountered Error.",
      payload: { updated: false, comment: null }
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
      updateComment({
        id: 1,
        data: {
          id: 1,
          postId: 1,
          name: "id labore ex et quam laborum",
          email: "Eliseo@gardner.biz",
          body: "Updated comment"
        }
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Update Comment By Id. Encountered Error.",
      payload: { updated: false, comment: null }
    });
  });

  /* #3 */
  test("returns updated false when response ok but comment is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updateComment({
        id: 1,
        data: {
          id: 1,
          postId: 1,
          name: "id labore ex et quam laborum",
          email: "Eliseo@gardner.biz",
          body: "Updated comment"
        }
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { updated: false, comment: null }
    });
  });

  /* #4 */
  test("returns updated true when response ok and comment has data", async () => {
    const mockComment = {
      id: 1,
      postId: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "Updated comment"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockComment)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updateComment({
        id: 1,
        data: {
          id: 1,
          postId: 1,
          name: "id labore ex et quam laborum",
          email: "Eliseo@gardner.biz",
          body: "Updated comment"
        }
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { updated: true, comment: mockComment }
    });
  });

  /* #5 */
  test("targets the comment update endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = {
      id: 10,
      postId: 1,
      name: "Updated Name",
      email: "updated@example.com",
      body: "Updated comment"
    };
    await updateComment({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/comments/10",
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
