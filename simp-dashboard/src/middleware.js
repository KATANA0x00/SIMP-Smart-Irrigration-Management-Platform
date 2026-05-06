import { NextResponse } from 'next/server';

/**
 * Access Verification Logic
 * @param {string} path - The request pathname
 * @param {number} userLevel - 0: Public, 1: Control, 2: Config/Admin
 * @returns {boolean}
 */
function verifyAccess(path, userLevel) {
  // Tier 2: Level 1 Access (Control)
  if (path.startsWith('/control')) {
    return userLevel >= 1;
  }

  // Tier 3: Level 2 Access (Config)
  if (path.startsWith('/config')) {
    return userLevel >= 2;
  }

  return true;
}

export function middleware(request) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;

  // MOCK: Current user level for development
  // 0: Public (Default)
  // 1: Control Access
  // 2: Config + Control Access.0
  
  const mockUserLevel = 2 ;

  const isAuthorized = verifyAccess(path, mockUserLevel);

  if (!isAuthorized) {
    // Redirect to dashboard with a query param
    // The dashboard can then show the "Enter Key" modal
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('unauthorized', 'true');
    loginUrl.searchParams.set('callbackUrl', path);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Ensure middleware only runs on restricted paths
export const config = {
  matcher: [
    '/control/:path*',
    '/config/:path*',
  ],
};
