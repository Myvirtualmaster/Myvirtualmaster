import { Comment } from '../models/index.js';

export const createComment = async (req, res) => {
  try {
    const comment = new Comment({
      user: req.user.id,
      lesson: req.body.lesson || null,
      assignment: req.body.assignment || null,
      content: req.body.content,
    }); 
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create comment', err });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments', err });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comment', err });
  }
};

export const getCommentByAssignmentId = async (req, res) => {
  try {
    const comment = await Comment.find({ assignment: req.params.assignmentId });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comment', err });
  }
};

export const getCommentByLessonId = async (req, res) => {
  try {
    console.log(req.params.lessonId);
    const comment = await Comment.find({ lesson: req.params.lessonId });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comment', err });
  }
};

export const updateComment = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update comment', err });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment', err });
  }
};

