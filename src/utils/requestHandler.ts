import { axios } from '@/lib/httpClient';

export const saveUserInfo = async (email: string, token: string) => {
  await axios.post('/api/userInfo', { email, token });
};

export const fetchUserInfo = async () => {
  const result = await axios.get<UserInfo>('/api/userInfo');
  return result.data;
};
