import createApiClient from "./apiClient";

const api = createApiClient("/book");

export const bookService = {
  getBookPaged: (criteria = {}) => api.get("", criteria),
  createBook: (bookData) => api.post("", bookData),
};