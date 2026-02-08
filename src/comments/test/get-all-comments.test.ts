/// <reference types="jest" />
import { getAllComments } from "../get-all-comments.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getAllComments", () => {
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

    await expect(getAllComments()).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get All Comments. Encountered Error.",
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

    await expect(getAllComments()).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get All Comments. Encountered Error.",
      payload: null
    });
  });

  /* #3 */
  test("returns payload when response ok", async () => {
    const mockPayload = [
      {
        id: 1,
        postId: 1,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos"
      },
      {
        id: 2,
        postId: 1,
        name: "quo vero reiciendis velit similique earum",
        email: "Jayne_Kuhic@sydney.com",
        body: "est natus enim nihil est dolore omnis voluptatem numquam"
      }
    ];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayload)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getAllComments()).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: mockPayload
    });
  });

  /* #4 */
  test("targets the comments endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue([])
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getAllComments();
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/comments"
    );
  });
});
