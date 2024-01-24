import express from 'express';
import EventService from './EventService';

const eventController = express.Router();

eventController.post('/events', async (req, res, next) => {
  const { eventName, eventDetail, startDatetime, endDatetime, capacity } = req.body;

  // TODO: Validation

  try {
    await EventService.create(eventName, eventDetail, startDatetime, endDatetime, capacity);
    return res.json('Event created');
  } catch (error) {
    return next(error);
  }
});

export default eventController;
