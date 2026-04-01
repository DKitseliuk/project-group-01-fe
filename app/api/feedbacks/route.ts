// app/feedbacks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { isAxiosError } from 'axios';
import { getCookieHeader, logErrorResponse } from '../_utils/utils';

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = await getCookieHeader();

    const page = Number(request.nextUrl.searchParams.get('page')) || 1;
    const perPage = Number(request.nextUrl.searchParams.get('perPage')) || 9;

    const res = await api('feedbacks', {
      params: {
        page,
        perPage,
      },
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
