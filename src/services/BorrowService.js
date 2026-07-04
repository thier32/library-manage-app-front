import createApiClient from "./apiClient";

const api = createApiClient("/borrow");

export const borrowService = {
  getBorrowPaged: (criteria) => api.get("", criteria),
  createBorrow: (borrowData) => api.post("", borrowData),
};