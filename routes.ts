/**
 * An array of routes that are accesisble to the public without authentication
 * @type {string{}}
 */

export const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/new-verification",
    "/auth/reset",
    "/auth/new-password",
  ];
  
  /**
   * An array of routes that are used for authentication
   * @type {string{}}
   */
  export const authRoutes = ["/auth/login", "/auth/register", "/auth/reset"];
  
  export const apiAuthPrefix = "/api/auth";
  
  export const DEFAULT_LOGIN_REDIRECT = "/settings";
  