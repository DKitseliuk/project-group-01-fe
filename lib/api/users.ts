import { nextServer } from './api';

export const getUser = async (userId: string) => {
  const { data } = await nextServer.get(`/users/${userId}`);
  return data;
};

export const getUserLocations = async (userId: string, page = 1, perPage = 6) => {
  const { data } = await nextServer.get(`/users/${userId}/locations?page=${page}&perPage=${perPage}`);
  return data;
};