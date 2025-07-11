import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/tools',
  '/profile',
  '/billing',
  '/api-keys',
];

// Define routes that should redirect authenticated users
const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
];

// API routes that require authentication
const protectedApiRoutes = [
  '/api/auth/logout',
  '/api/auth/validate',
  '/api/user',
  '/api/pdf',
  '/api/ocr',
  '/api/keys',
  '/api/track-usage',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    // Allow public API routes
    if (pathname === '/api/health' || 
        pathname === '/api/pricing' || 
        pathname === '/api/auth/register' || 
        pathname === '/api/auth/login' || 
        pathname === '/api/auth/reset-password' ||
        pathname === '/api/auth/google') {
      return NextResponse.next();
    }

    // Check if API route requires authentication
    const requiresAuth = protectedApiRoutes.some(route => 
      pathname.startsWith(route)
    );

    if (requiresAuth && !token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // Handle static files and Next.js internals
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/favicon.ico') ||
      pathname.startsWith('/images/') ||
      pathname.startsWith('/icons/')) {
    return NextResponse.next();
  }

  // Check if current path requires authentication
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if current path is an auth route
  const isAuthRoute = authRoutes.includes(pathname);

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle root path
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};