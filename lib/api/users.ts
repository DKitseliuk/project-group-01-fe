import { nextServer } from './api';

export const getUser = async (userId: string) => {
  const { data } = await nextServer.get(`/users/${userId}`);
  return data.user;
};

export const getUserLocations = async (userId: string) => {
  const { data } = await nextServer.get(`/users/${userId}/locations`);
  return data;
};