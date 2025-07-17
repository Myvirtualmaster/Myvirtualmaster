import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/index.js';
import { paginate } from '../utils/paginate.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ email }) ;
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
    expiresIn: '7d',
    });

    res.status(201).json({user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error});
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  }
  catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }
};

export const getAllUsers = async (req, res) => {
  try {
       const queryBuilder = User.find().select('-password');

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { createdAt: -1 }
    });

    res.status(200).json(result);
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error })
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted' });
  }
  catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};

export const updateUser = async (req, res) => {
  try {

    const updateUser = await User.findByIdAndUpdate(req.params.id, {$set : req.body}, {new: true, runValidators: true});
    if(!updateUser) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(updateUser);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
