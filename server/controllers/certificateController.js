import { Certificate } from '../models/index.js';
import { paginate } from '../utils/paginate.js';


export const createCertificate = async (req, res) => {
  try {
    const { user, course, certificate_url } = req.body;

    // Check if already exists
    const existing = await Certificate.findOne({ user, course });
    if (existing) {
      return res.status(400).json({ message: 'Certificate already exists for this user and course.' });
    }

    const certificate = new Certificate({
      user,
      course,
      certificate_url,
      issued_at: new Date(),
    });

    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create certificate', err });
  }
};


export const getAllCertificates = async (req, res) => {
  try {
    const queryBuilder = Certificate.find()
      .populate('user', 'name email')
      .populate('course', 'title');

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { issued_at: -1 }
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch certificates', err });
  }
};


export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('user', 'name email')
      .populate('course', 'title');
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.status(200).json(certificate);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch certificate', err });
  }
};


export const getCertificatesByUser = async (req, res) => {
  try {
    const queryBuilder = Certificate.find({ user: req.params.userId })
      .populate('course', 'title');

    const result = await paginate(queryBuilder, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sort: { issued_at: -1 }
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user certificates', err });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const deleted = await Certificate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Certificate not found' });
    res.status(200).json({ message: 'Certificate deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete certificate', err });
  }
};

