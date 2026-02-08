/// <reference types="jest" />
import { getUserById } from "../get-user-by-id.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getUserById", () => {
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

    await expect(getUserById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get User By Id. Encountered Error.",
      payload: { found: false, user: null }
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

    await expect(getUserById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get User By Id. Encountered Error.",
      payload: { found: false, user: null }
    });
  });

  /* #3 */
  test("returns found false when response ok but user is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getUserById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: false, user: null }
    });
  });

  /* #4 */
  test("returns found true when response ok and user has data", async () => {
    const mockUser = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockUser)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getUserById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: true, user: mockUser }
    });
  });

  /* #5 */
  test("targets the user by id endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getUserById({ id: 99 });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/99"
    );
  });
});
