/// <reference types="jest" />
import { updateTodo } from "../update-todo.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("updateTodo", () => {
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
      updateTodo({
        id: 1,
        data: {
          id: 1,
          userId: 1,
          title: "Updated todo",
          completed: true
        }
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Update Todo By Id. Encountered Error.",
      payload: { updated: false, todo: null }
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
      updateTodo({
        id: 1,
        data: {
          id: 1,
          userId: 1,
          title: "Updated todo",
          completed: true
        }
      })
    ).resolves.toEqual({
      code: "api-fail",
      message: "[Bad]: Update Todo By Id. Encountered Error.",
      payload: { updated: false, todo: null }
    });
  });

  /* #3 */
  test("returns updated false when response ok but todo is empty", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updateTodo({
        id: 1,
        data: {
          id: 1,
          userId: 1,
          title: "Updated todo",
          completed: true
        }
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { updated: false, todo: null }
    });
  });

  /* #4 */
  test("returns updated true when response ok and todo has data", async () => {
    const mockTodo = {
      id: 1,
      userId: 1,
      title: "Updated todo",
      completed: true
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockTodo)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(
      updateTodo({
        id: 1,
        data: {
          id: 1,
          userId: 1,
          title: "Updated todo",
          completed: true
        }
      })
    ).resolves.toEqual({
      code: "api-ok",
      message: "No errors encountered. Check payload.",
      payload: { updated: true, todo: mockTodo }
    });
  });

  /* #5 */
  test("targets the todo update endpoint with body and headers", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({})
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const payload = {
      id: 10,
      userId: 1,
      title: "Updated todo",
      completed: true
    };
    await updateTodo({ id: 10, data: payload });

    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/10",
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    );
  });
});
