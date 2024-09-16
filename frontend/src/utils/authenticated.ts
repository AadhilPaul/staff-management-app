export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken && refreshToken) {
    return true;
  }
  return false;
};