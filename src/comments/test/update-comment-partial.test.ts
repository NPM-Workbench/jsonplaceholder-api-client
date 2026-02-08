/// <reference types="jest" />
import { updateCommentPartial } from "../update-comment-partial.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updateCommentPartial", () => {
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
      updateCommentPartial({ id: 1, data: { body: "Updated comment" } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Comment By Id. Encountered Error.",
      payload: { patched: false, comment: null }
    });
  });

  /* #2 */
  test("returns api-fail when data is empty", async () => {
    console.error = jest.fn();

    await expect(updateCommentPartial({ id: 1, data: {} })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Comment By Id. Encountered Error.",
      payload: { patched: false, comment: null }
    });
  });

  /* #3 */
  test("returns api-fail when fetch response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);
    console.error = jest.fn();

    await expect(
      updateCommentPartial({ id: 1, data: { body: "Updated comment" } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Comment By Id. Encountered Error.",
      payload: { patched: false, comment: null }
    });
  });

  /* #4 */
  test("returns patched false when response ok but comment is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updateCommentPartial({ id: 1, data: { body: "Updated comment" } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: false, comment: null }
    });
  });

  /* #5 */
  test("returns patched true when response ok and comment has data", async () => {
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
      updateCommentPartial({ id: 1, data: { body: "Updated comment" } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: true, comment: mockComment }
    });
  });

  /* #6 */
  test("targets the comment patch endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { body: "Patched comment" };
    await updateCommentPartial({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/comments/10",
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
  });
});
