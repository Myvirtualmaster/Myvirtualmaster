import express from 'express';
import { createSubmission, deleteSubmission, getAllSubmissions, getSubmissionById, updateSubmission } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/register/:assignmentId', createSubmission);
router.get('/', getAllSubmissions);
router.get('/single/:id', getSubmissionById);
router.delete('/delete/:id', deleteSubmission);
router.put('/update/:id', updateSubmission);

export default router;
