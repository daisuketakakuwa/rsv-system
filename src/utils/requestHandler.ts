import { axios } from '@/lib/httpClient';

export const saveUserInfo = async (email: string, token: string) => {
  await axios.post('/api/auth/userInfo', { email, token });
};

export const fetchEvents = async () => {
  return (await axios.get('/api/events')).data;
};

export const saveEvent = async (
  eventName: string,
  eventDetail: string,
  startDatetime: string,
  endDatetime: string,
  capacity: string,
) => {
  await axios.post('/api/events', {
    eventName,
    eventDetail,
    startDatetime,
    endDatetime,
    capacity,
  });
};

export const fetchUserInfo = async () => {
  const result = await axios.get<UserInfo>('/api/auth/userInfo');
  return {
    status: result.status,
    data: result.data,
  };
};
