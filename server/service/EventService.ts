import EventRepository from '../repository/EventRepository';
import { jstToUtc } from '../util/DatetimeUtil';

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
