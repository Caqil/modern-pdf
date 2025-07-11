export const clearAllAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("apiKey");
  localStorage.removeItem("user");
};

export const setAuthData = (token: string, user: any, apiKey?: string) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(user));
  if (apiKey) {
    localStorage.setItem("apiKey", apiKey);
  }
};

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};