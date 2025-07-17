import { Forum } from '../models/index.js';

export const createForum = async (req, res) => {
  try {
    const forum = new Forum({ ...req.body, created_by: req.user.id });
    await forum.save();
    res.status(201).json(forum);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create forum', err });
  }
};

export const getForumsByCourse = async (req, res) => {
  try {
    const forums = await Forum.find({ course: req.params.courseId }).populate('created_by', 'name');
    res.status(200).json(forums);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch forums', err });
  }
};

