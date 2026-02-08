/// <reference types="jest" />
import { API_BASE_URL } from "../api-base-url.js";

describe("shared", () => {
  test("API_BASE_URL points to jsonplaceholder base", () => {
    expect(API_BASE_URL).toBe("https://jsonplaceholder.typicode.com");
  });
});
