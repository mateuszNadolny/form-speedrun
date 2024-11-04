/**
 * An array of routes that are accessible to public
 * @type {string[]}
 */
export const publicRoutes = ['/', '/verify-email', '/error', '/game'];

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = ['/signin', '/error', '/reset-password', '/new-password'];

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
