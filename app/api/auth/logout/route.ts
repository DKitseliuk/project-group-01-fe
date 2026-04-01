// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { getCookieHeader, logErrorResponse } from '../../_utils/utils';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieHeader = await getCookieHeader();
    const cookieStore = await cookies();

    await api.post('auth/logout', null, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionId');

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
