/// <reference types="jest" />
import { createNewTodo } from "../create-new-todo.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("createNewTodo", () => {
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
      createNewTodo({
        userId: 1,
        title: "Test Todo",
        completed: false
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Todo. Encountered Error.",
      payload: { created: false, todo: null }
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
      createNewTodo({
        userId: 1,
        title: "Test Todo",
        completed: false
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Create New Todo. Encountered Error.",
      payload: { created: false, todo: null }
    });
  });

  /* #3 */
  test("returns created false when response ok but todo is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewTodo({
        userId: 1,
        title: "Test Todo",
        completed: false
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: false, todo: null }
    });
  });

  /* #4 */
  test("returns created true when response ok and todo has data", async () => {
    const mockTodo = { id: 201, userId: 1, title: "Test Todo", completed: false };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockTodo)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      createNewTodo({
        userId: 1,
        title: "Test Todo",
        completed: false
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { created: true, todo: mockTodo }
    });
  });

  /* #5 */
  test("targets the todos endpoint with POST body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = { userId: 1, title: "Test Todo", completed: false };
    await createNewTodo(payload);

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos",
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
