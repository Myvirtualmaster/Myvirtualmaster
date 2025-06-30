import express from 'express';
import { createResource, deleteResource, getResourceById, getResourceByLesson, updateResource } from '../controllers/resourceController.js';

const router = express.Router();

router.post('/register/:lessonId', createResource);
router.get('/:lessonId', getResourceByLesson);
router.get('/single/:id', getResourceById);
router.delete('/delete/:id', deleteResource);
router.put('/update/:id', updateResource);

export default router;
