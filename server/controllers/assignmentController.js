import {Assignment} from '../models/index.js';
import { paginate } from '../utils/paginate.js';

export const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment({ ...req.body, course: req.params.courseId });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create assignment', error });
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const queryBuilder = Assignment.find();

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { due_date: 1 }
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch assignments', error });
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch assignment', error });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Assignment not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update assignment', error });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Assignment not found' });
    res.status(200).json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete assignment', error });
  }
};

