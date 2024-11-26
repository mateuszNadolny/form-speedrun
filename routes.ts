/**
 * An array of routes that are accessible to public
 * @type {string[]}
 */
export const publicRoutes = ['/', '/game', '/scoreboard'];

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = ['/signin', '/error'];

/**
 * Prefix for API authentication routes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Default redirect for logged in users
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/game';
