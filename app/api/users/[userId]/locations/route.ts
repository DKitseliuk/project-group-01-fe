// app/api/users/[userId]/locations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { getCookieHeader, logErrorResponse } from '../../../_utils/utils';
import { isAxiosError } from 'axios';

type Props = {
  params: Promise<{ userId: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const cookieHeader = await getCookieHeader();
    const { userId } = await params;

    const page = Number(request.nextUrl.searchParams.get('page')) || 1;
    const perPage = Number(request.nextUrl.searchParams.get('perPage')) || 6;

    const res = await api.get(`users/${userId}/locations`, {
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
