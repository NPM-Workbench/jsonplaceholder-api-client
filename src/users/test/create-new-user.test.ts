/// <reference types="jest" />
import { createNewUser } from "../create-new-user.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("createNewUser", () => {
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
      createNewUser({
        name: "Test User",
        username: "testuser",
        email: "test@example.com"
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New User. Encountered Error.",
      payload: { created: false, user: null }
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
      createNewUser({
        name: "Test User",
        username: "testuser",
        email: "test@example.com"
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New User. Encountered Error.",
      payload: { created: false, user: null }
    });
  });

  /* #3 */
  test("returns created false when response ok but user is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewUser({
        name: "Test User",
        username: "testuser",
        email: "test@example.com"
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: false, user: null }
    });
  });

  /* #4 */
  test("returns created true when response ok and user has data", async () => {
    const mockUser = { id: 101, name: "Test User", username: "testuser", email: "test@example.com" };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockUser)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewUser({
        name: "Test User",
        username: "testuser",
        email: "test@example.com"
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: true, user: mockUser }
    });
  });

  /* #5 */
  test("targets the users endpoint with POST body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { name: "Test User", username: "testuser", email: "test@example.com" };
    await createNewUser(payload);

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users",
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
