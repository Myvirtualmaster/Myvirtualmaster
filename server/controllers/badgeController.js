import { Badge } from '../models/index.js';
import { paginate } from '../utils/paginate.js';

export const createBadge = async (req, res) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create badge', err });
  }
};

export const getAllBadges = async (req, res) => {
  try {
    const queryBuilder = Badge.find();

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: -1 }
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch badges', err });
  }
};

export const getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) return res.status(404).json({ message: 'Badge not found' });
    res.status(200).json(badge);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch badge', err });
  }
};

export const updateBadge = async (req, res) => {
  try {
    const updated = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Badge not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update badge', err });
  }
};

export const deleteBadge = async (req, res) => {
  try {
    const deleted = await Badge.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Badge not found' });
    res.status(200).json({ message: 'Badge deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete badge', err });
  }
};
