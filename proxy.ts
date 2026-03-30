// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { api } from './lib/api/api';

const privateRoutes = [
  '/profile/edit',
  '/locations/action/add',
  '/locations/action/edit',
];
const publicAuthRoutes = ['/register', '/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const sessionId = request.cookies.get('sessionId')?.value;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isAuthPublicRoute = publicAuthRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const apiRes = await api.post('auth/refresh', null, {
          headers: {
            Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`,
          },
        });

        const setCookie = apiRes.headers['set-cookie'];
        const response = isAuthPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken)
              response.cookies.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken)
              response.cookies.set(
                'refreshToken',
                parsed.refreshToken,
                options
              );
            if (parsed.sessionId)
              response.cookies.set('sessionId', parsed.sessionId, options);
          }
        }

        return response;
      } catch {
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
      }
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }

  if (isAuthPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/register', '/login', '/locations/:path*', '/profile/:path*'],
};
