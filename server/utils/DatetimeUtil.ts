import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 拡張機能を有効にする
dayjs.extend(utc);
dayjs.extend(timezone);

// JST → UTC
export const jstToUtc = (jstTimeString: string): string => {
  const jstTime = dayjs(jstTimeString).tz('Asia/Tokyo');
  const utcTime = jstTime.utc();
  return utcTime.format('YYYY-MM-DDTHH:mm:ss');
};

// UTC → JST
export const utcToJst = (utcTimeString: string): string => {
  const utcTime = dayjs(utcTimeString).utc();
  const jstTime = utcTime.tz('Asia/Tokyo');
  return jstTime.format('YYYY-MM-DDTHH:mm:ss');
};

export const loggerTimestamp = (): string => {
  return dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss.SSS');
};
