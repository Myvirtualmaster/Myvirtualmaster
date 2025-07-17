import { Reply } from '../models/index.js';

export const createReply = async (req, res) => {
  try {
    const reply = new Reply({ ...req.body, author: req.user.id });
    await reply.save();
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post reply', err });
  }
};

export const getRepliesByPost = async (req, res) => {
  try {
    const replies = await Reply.find({ post: req.params.postId }).populate('author', 'name');
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch replies', err });
  }
};

export const toggleLikeReply = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    const userId = req.user.id;
    const index = reply.likes.indexOf(userId);
    if (index > -1) reply.likes.splice(index, 1);
    else reply.likes.push(userId);
    await reply.save();
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ message: 'Failed to like/unlike reply', err });
  }
};

