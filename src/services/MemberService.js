import createApiClient from "./apiClient";

const api = createApiClient("/member");

export const memberService = {
  getMemberPaged: (criteria) => api.get("", criteria),
  createMember: (memberData) => api.post("", memberData),
};