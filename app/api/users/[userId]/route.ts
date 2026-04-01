// app/api/users/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { getCookieHeader, logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';

type Props = {
  params: Promise<{ userId: string }>;
};

export async function GET(_request: NextRequest, { params }: Props) {
  try {
    const cookieHeader = await getCookieHeader();
    const { userId } = await params;

    const res = await api.get(`users/${userId}`, {
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
