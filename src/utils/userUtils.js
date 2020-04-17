export function getToken() {
  const token = localStorage.getItem("token");

  if (token) {
    return token;
  }

  return null;
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}
export function isTokenNotExpired(token) {
  if (!token) {
    return false;
  }

  const parsedToken = parseJwt(token);

  if (parsedToken.exp * 1000 > +new Date()) {
    return true;
  }

  removeToken();

  return false;
}
