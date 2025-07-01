import express from 'express';
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from '../controllers/assignmentController.js';

const router = express.Router();

router.post('/register/:courseId', createAssignment);
router.get('/', getAllAssignments);
router.get('/single/:id', getAssignmentById);
router.delete('/delete/:id', deleteAssignment);
router.put('/update/:id', updateAssignment);

export default router;
