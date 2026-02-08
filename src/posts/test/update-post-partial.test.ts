/// <reference types="jest" />
import { updatePostPartial } from "../update-post-partial.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updatePostPartial", () => {
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
      updatePostPartial({ id: 1, data: { title: "Updated title" } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Post By Id. Encountered Error.",
      payload: { patched: false, post: null }
    });
  });

  /* #2 */
  test("returns api-fail when data is empty", async () => {
    console.error = jest.fn();

    await expect(updatePostPartial({ id: 1, data: {} })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Post By Id. Encountered Error.",
      payload: { patched: false, post: null }
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
      updatePostPartial({ id: 1, data: { title: "Updated title" } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Post By Id. Encountered Error.",
      payload: { patched: false, post: null }
    });
  });

  /* #4 */
  test("returns patched false when response ok but post is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updatePostPartial({ id: 1, data: { title: "Updated title" } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: false, post: null }
    });
  });

  /* #5 */
  test("returns patched true when response ok and post has data", async () => {
    const mockPost = {
      id: 1,
      userId: 1,
      title: "Updated title",
      body: "Updated body"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPost)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updatePostPartial({ id: 1, data: { title: "Updated title" } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: true, post: mockPost }
    });
  });

  /* #6 */
  test("targets the post patch endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { title: "Patched title" };
    await updatePostPartial({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/10",
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
