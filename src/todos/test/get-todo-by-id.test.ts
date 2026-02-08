/// <reference types="jest" />
import { getTodoById } from "../get-todo-by-id.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getTodoById", () => {
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

    await expect(getTodoById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get Todo By Id. Encountered Error.",
      payload: { found: false, todo: null }
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

    await expect(getTodoById({ id: 1 })).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Get Todo By Id. Encountered Error.",
      payload: { found: false, todo: null }
    });
  });

  /* #3 */
  test("returns found false when response ok but todo is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getTodoById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: false, todo: null }
    });
  });

  /* #4 */
  test("returns found true when response ok and todo has data", async () => {
    const mockTodo = {
      id: 1,
      userId: 1,
      title: "delectus aut autem",
      completed: false
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockTodo)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getTodoById({ id: 1 })).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { found: true, todo: mockTodo }
    });
  });

  /* #5 */
  test("targets the todo by id endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getTodoById({ id: 99 });
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/99"
    );
  });
});
