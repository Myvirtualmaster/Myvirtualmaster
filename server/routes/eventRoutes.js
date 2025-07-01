import express from 'express';
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/register', createEvent);
router.get('/', getAllEvents);
router.get('/single/:id',getEventById);
router.delete('/delete/:id', deleteEvent);
router.put('/update/:id', updateEvent);

export default router;
