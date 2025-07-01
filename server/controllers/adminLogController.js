import { AdminLog } from '../models/index.js';

// Create a new admin log
export const createLog = async (req, res) => {
  try {
    const log = new AdminLog({ ...req.body, admin: req.user.id });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create log', err });
  }
};

// Get all logs (optionally paginated or filtered in the future)
export const getAllLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find().sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', err });
  }
};

// Get a single log by ID
export const getLogById = async (req, res) => {
  try {
    const log = await AdminLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch log', err });
  }
};

// Update a log entry
export const updateLog = async (req, res) => {
  try {
    const updated = await AdminLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update log', err });
  }
};

// Delete a log by ID
export const deleteLog = async (req, res) => {
  try {
    const deleted = await AdminLog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete log', err });
  }
};

export const getLogsByAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    const logs = await AdminLog.find({ admin: adminId })
      .sort({ timestamp: -1 }) // latest first
      .populate('admin', 'name email'); // optional: show admin name/email

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: 'No logs found for this admin.' });
    }

    res.status(200).json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch logs by admin', err });
  }
};


