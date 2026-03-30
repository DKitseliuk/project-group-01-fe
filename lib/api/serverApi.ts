import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { api, nextServer } from './api';

const refreshSession = async (): Promise<
  AxiosResponse<{ message: string }>
> => {
  const cookieStore = await cookies();
  const res = await api.post<{ message: string }>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
export { refreshSession };
