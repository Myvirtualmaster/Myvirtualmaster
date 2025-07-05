import { Message } from '../models/index.js';

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const message = new Message({
      sender: req.user.id,
      receiver: req.body.receiver,
      message: req.body.message,
      sent_at: new Date(),
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', err });
  }
};

// Get messages between two users
export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id }
      ]
    }).sort({ sent_at: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get conversation', err });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const message = await Message.findById(req.params.userId);

    if (!message) return res.status(404).json({ message: 'Message not found' });

    // Optional: Check if the user is sender or receiver
    if (message.sender.toString() !== userId && message.receiver.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this message' });
    }

    await Message.findByIdAndDelete(req.params.userId);
    
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete message', error });
  }
};

