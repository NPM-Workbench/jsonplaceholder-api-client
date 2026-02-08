/// <reference types="jest" />
import { deleteTodo } from "../delete-todo.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("deleteTodo", () => {
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

    await expect(deleteTodo({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Delete Todo. Encountered Error."
    });
  });

  /* #2 */
  test("returns api-fail when fetch response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);
    console.error = jest.fn();

    await expect(deleteTodo({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Delete Todo. Encountered Error."
    });
  });

  /* #3 */
  test("returns api-ok when response ok", async () => {
    const mockResponse = { ok: true };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(deleteTodo({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "Todo Deleted Successfully. No Errors Encountered"
    });
  });

  /* #4 */
  test("targets the todo delete endpoint", async () => {
    const mockResponse = { ok: true };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await deleteTodo({ id: 99 });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/99",
      { method: "DELETE" }
    );
  });
});
