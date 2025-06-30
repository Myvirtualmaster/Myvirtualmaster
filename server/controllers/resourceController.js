import { Resource } from "../models/index.js";

export const createResource = async (req, res) => {
  try {
    const resource = new Resource({ ...req.body, lesson: req.params.lessonId });

    await resource.save();
    res.status(201).json(resource);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getResourceByLesson = async (req, res) => {
  try {
    const resource = await Resource.find({ lesson: req.params.lessonId});
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
  
    res.status(200).json(resource);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });

    res.status(200).json(resource);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch resource', error });
  }
}

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found'});

    res.status(200).json({ message: 'Resource deeleted' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete resource' , error });
  }
}

export const updateResource = async (req, res) => {
  try {
    const updateResource = await Resource.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});
    if (!updateResource) return res.status(404).json({ message: 'Resource not found'});

    res.status(200).json(updateResource);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update resource', error });
  }
}
