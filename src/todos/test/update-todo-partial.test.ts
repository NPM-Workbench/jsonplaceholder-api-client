/// <reference types="jest" />
import { updateTodoPartial } from "../update-todo-partial.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updateTodoPartial", () => {
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
      updateTodoPartial({ id: 1, data: { completed: true } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Todo By Id. Encountered Error.",
      payload: { patched: false, todo: null }
    });
  });

  /* #2 */
  test("returns api-fail when data is empty", async () => {
    console.error = jest.fn();

    await expect(updateTodoPartial({ id: 1, data: {} })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Todo By Id. Encountered Error.",
      payload: { patched: false, todo: null }
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
      updateTodoPartial({ id: 1, data: { completed: true } })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Partial Update Todo By Id. Encountered Error.",
      payload: { patched: false, todo: null }
    });
  });

  /* #4 */
  test("returns patched false when response ok but todo is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updateTodoPartial({ id: 1, data: { completed: true } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: false, todo: null }
    });
  });

  /* #5 */
  test("returns patched true when response ok and todo has data", async () => {
    const mockTodo = {
      id: 1,
      userId: 1,
      title: "delectus aut autem",
      completed: true
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockTodo)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updateTodoPartial({ id: 1, data: { completed: true } })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { patched: true, todo: mockTodo }
    });
  });

  /* #6 */
  test("targets the todo patch endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { completed: true };
    await updateTodoPartial({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/10",
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
