import { axios } from '@/lib/httpClient';

export const saveUserInfo = async (email: string, token: string) => {
  await axios.post('/api/auth/userInfo', { email, token });
};

export const fetchUserInfo = async () => {
  const result = await axios.get<UserInfo>('/api/auth/userInfo');
  return {
    status: result.status,
    data: result.data,
  };
};
