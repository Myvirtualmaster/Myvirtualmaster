import { Course } from '../models/index.js';

export const createCourse = async (req, res) => {
  try {
    const course = new Course({ ...req.body, teacher: req.user.id});
    await course.save();
    res.status(201).json(course);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch courses', error });
  }
}

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found'});
    
    res.status(200).json(course);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch user', error});
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json({ message: 'Course deleted' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete course', error });
  }
}

export const updateCourse = async (req, res) => {
  try {
    const updateCourse = await Course.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});
    if (!updateCourse) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(updateCourse);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update course', error });
  }
} 








