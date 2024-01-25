import { jstToUtc, utcToJst } from '../../utils/DatetimeUtil';
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

const search = async () => {
  try {
    // fetch from DB
    const events = await EventRepository.search();
    // UTC → JST
    const timezonedEvents = events.map((e) => ({
      id: e.id,
      eventName: e.name,
      eventDetail: e.detail,
      startDatetime: utcToJst(e.start_datetime),
      endDatetime: utcToJst(e.end_datetime),
    }));
    return timezonedEvents;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  search,
};
