import { Achievement } from '../models/index.js';

export const awardBadge = async (req, res) => {
  try {
    const achievement = new Achievement({
      user: req.body.user,
      badge: req.body.badge,
    });
    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(500).json({ message: 'Failed to award badge', err });
  }
};

export const getUserAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.params.userId }).populate('badge');
    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch achievements', err });
  }
};

export const deleteUserAchievement = async (req, res) => {
  try {
    const deleted = await Achievement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Achievement not found' });
    res.status(200).json({ message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete achievement', err });
  }
};
