import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

/** GET /api/experience — public, sorted by displayOrder */
export async function getExperiences(req, res, next) {
  try {
    const experiences = await Experience.find().sort({ displayOrder: 1, createdAt: -1 });
    return sendSuccess(res, { experiences }, 'Experiences fetched');
  } catch (err) {
    next(err);
  }
}

/** GET /api/experience/:id — public */
export async function getExperience(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid experience id');
    const experience = await Experience.findById(id);
    if (!experience) throw new ApiError(404, 'Experience not found');
    return sendSuccess(res, { experience }, 'Experience fetched');
  } catch (err) {
    next(err);
  }
}

/** POST /api/experience — admin only */
export async function createExperience(req, res, next) {
  try {
    const experience = await Experience.create(req.body);
    return sendSuccess(res, { experience }, 'Experience created', 201);
  } catch (err) {
    next(err);
  }
}

/** PUT /api/experience/:id — admin only */
export async function updateExperience(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid experience id');
    const experience = await Experience.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!experience) throw new ApiError(404, 'Experience not found');
    return sendSuccess(res, { experience }, 'Experience updated');
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/experience/:id — admin only */
export async function deleteExperience(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid experience id');
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) throw new ApiError(404, 'Experience not found');
    return sendSuccess(res, null, 'Experience deleted');
  } catch (err) {
    next(err);
  }
}
