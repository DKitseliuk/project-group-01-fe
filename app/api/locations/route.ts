// app/api/locations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { getCookieHeader, logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = await getCookieHeader();

    const page = Number(request.nextUrl.searchParams.get('page')) || 1;
    const perPage = Number(request.nextUrl.searchParams.get('perPage')) || 9;

    const search = request.nextUrl.searchParams.get('search') || '';
    const region = request.nextUrl.searchParams.get('region') || '';
    const type = request.nextUrl.searchParams.get('type') || '';
    const sortBy = request.nextUrl.searchParams.get('sortBy') || '';
    const sortOrder = request.nextUrl.searchParams.get('sortOrder') || '';

    const res = await api.get('locations', {
      params: {
        ...(search !== '' && { search }),
        page,
        perPage,
        ...(region !== '' && { region }),
        ...(type !== '' && { type }),
        ...(sortBy !== '' && { sortBy }),
        ...(sortOrder !== '' && { sortOrder }),
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

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = await getCookieHeader();

    const formData = await request.formData();

    const res = await api.post('locations', formData, {
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
