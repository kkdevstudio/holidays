import express from 'express';
import Event from '../models/event.js';

const router = express.Router();

export const getEvents = async (req, res) => {
  const events = await Event.find({});

  try {
    res.status(200).json(events);
  } catch (err) {
    // handleError(err, res);
  }
};

router.route('/').get(getEvents);

export default router;
