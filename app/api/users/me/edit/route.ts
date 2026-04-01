// app/api/users/me/edit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { getCookieHeader, logErrorResponse } from '../../../_utils/utils';
import { isAxiosError } from 'axios';

export async function PATCH(request: NextRequest) {
  try {
    const cookieHeader = await getCookieHeader();

    const formData = await request.formData();

    const res = await api.patch('users/me/edit', formData, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
