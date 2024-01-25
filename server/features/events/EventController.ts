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

// TODO: 動的に条件を指定できるようにする
// TODO: ページング＆ソート機能
eventController.get('/events', async (req, res, next) => {
  try {
    const events = await EventService.search();
    return res.json({ events });
  } catch (error) {
    return next(error);
  }
});

export default eventController;
