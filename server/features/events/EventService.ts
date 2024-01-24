import { jstToUtc } from '../../utils/DatetimeUtil';
import EventRepository from './EventRepository';

const create = async (
  eventName: string,
  eventDetail: string,
  startDatetime: string,
  endDatetime: string,
  capacity: string,
) => {
  try {
    // JTC → UTC
    const utcStartDatetime = jstToUtc(startDatetime);
    const utcEndDatetime = jstToUtc(endDatetime);

    await EventRepository.create(
      eventName,
      eventDetail,
      new Date(utcStartDatetime),
      new Date(utcEndDatetime),
      Number(capacity),
    );
  } catch (error) {
    throw error;
  }
};

export default {
  create,
};
