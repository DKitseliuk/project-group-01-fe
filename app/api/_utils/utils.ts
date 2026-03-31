import { cookies } from 'next/headers';

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export async function getCookieHeader() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;
  return `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`;
}
