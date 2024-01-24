import { PrismaClient } from '@prisma/client';
import RuntimeError from '../error/RuntimeError';
import logger from '../logger';

const prisma = new PrismaClient();

const create = async (
  eventName: string,
  eventDetail: string,
  // should be UTC
  startDatetime: Date,
  endDatetime: Date,
  capacity: number,
) => {
  try {
    const createdEvent = await prisma.event.create({
      data: {
        name: eventName,
        detail: eventDetail,
        start_datetime: startDatetime,
        end_datetime: endDatetime,
        capacity,
      },
    });
    return createdEvent;
  } catch (error) {
    logger.error('Failed to create event.');
    throw new RuntimeError(500, error.message);
  }
};

export default {
  create,
};
