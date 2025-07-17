import { CalendarEvent } from '../models/index.js';
import { paginate } from '../utils/paginate.js';

export const createEvent = async (req, res) => {
  try {
    const event = new CalendarEvent(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', err });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const queryBuilder = CalendarEvent.find();

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { start_time: 1 }
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', err });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch event', err });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updated = await CalendarEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event', err });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deleted = await CalendarEvent.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', err });
  }
};

