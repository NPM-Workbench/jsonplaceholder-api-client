/// <reference types="jest" />
import { updateUserPartial } from "../update-user-partial.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updateUserPartial", () => {
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

    await expect(updateUserPartial({ id: 1, data: { name: "Updated Name" } })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update User By Id. Encountered Error.",
      payload: { patched: false, user: null }
    });
  });

  /* #2 */
  test("returns api-fail when data is empty", async () => {
    console.error = jest.fn();

    await expect(updateUserPartial({ id: 1, data: {} })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update User By Id. Encountered Error.",
      payload: { patched: false, user: null }
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

    await expect(updateUserPartial({ id: 1, data: { name: "Updated Name" } })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update User By Id. Encountered Error.",
      payload: { patched: false, user: null }
    });
  });

  /* #4 */
  test("returns patched false when response ok but user is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(updateUserPartial({ id: 1, data: { name: "Updated Name" } })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: false, user: null }
    });
  });

  /* #5 */
  test("returns patched true when response ok and user has data", async () => {
    const mockUser = {
      id: 1,
      name: "Updated Name",
      username: "Bret",
      email: "Sincere@april.biz"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockUser)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(updateUserPartial({ id: 1, data: { name: "Updated Name" } })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: true, user: mockUser }
    });
  });

  /* #6 */
  test("targets the user patch endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { name: "Patched Name" };
    await updateUserPartial({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/10",
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
