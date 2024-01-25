import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 拡張機能を有効にする
dayjs.extend(utc);
dayjs.extend(timezone);

export const DATETIME_FOMRATS = {
  FORMAT1: 'YYYY年MM月DD日 HH時mm分',
};

export const formatDate = (inputString: string, format: string) =>
  dayjs(inputString).format(format);
