import { Post } from '../models/index.js';
import { paginate } from '../utils/paginate.js';

export const createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', err });
  }
};

export const getPostsByForum = async (req, res) => {
  try {
    const posts = await Post.find({ forum: req.params.forumId })
      .populate('author', 'name')
      .sort({ created_at: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', err });
  }
};

export const getPaginatedPosts = async (req, res) => {
  try {
    const paginationResult = await paginate(Post, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: -1 }
    });

    res.status(200).json(paginationResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};


export const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;
    const index = post.likes.indexOf(userId);
    if (index > -1) post.likes.splice(index, 1);
    else post.likes.push(userId);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to like/unlike post', err });
  }
};

export const markPostResolved = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { resolved: true }, { new: true });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark post resolved', err });
  }
};

