import express from 'express';
import { createComment, deleteComment, getAllComments, getCommentByAssignmentId, getCommentById, getCommentByLessonId, updateComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/register', createComment);
router.get('/', getAllComments);
router.get('/single/:id', getCommentById);
router.get('/assignment/:assignmentId', getCommentByAssignmentId);
router.get('/lesson/:lessonId', getCommentByLessonId);
router.delete('/delete/:id', deleteComment);
router.put('/update/:id', updateComment);

export default router;
