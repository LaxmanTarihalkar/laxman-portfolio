import mongoose from 'mongoose';
import Skill from '../models/Skill.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

/** GET /api/skills — public */
export async function getSkills(req, res, next) {
  try {
    const skills = await Skill.find().sort({ displayOrder: 1, createdAt: 1 });
    return sendSuccess(res, { skills }, 'Skills fetched');
  } catch (err) {
    next(err);
  }
}

/** GET /api/skills/:id — public */
export async function getSkill(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid skill id');
    const skill = await Skill.findById(id);
    if (!skill) throw new ApiError(404, 'Skill group not found');
    return sendSuccess(res, { skill }, 'Skill fetched');
  } catch (err) {
    next(err);
  }
}

/** POST /api/skills — admin only */
export async function createSkill(req, res, next) {
  try {
    const skill = await Skill.create(req.body);
    return sendSuccess(res, { skill }, 'Skill group created', 201);
  } catch (err) {
    next(err);
  }
}

/** PUT /api/skills/:id — admin only */
export async function updateSkill(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid skill id');
    const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!skill) throw new ApiError(404, 'Skill group not found');
    return sendSuccess(res, { skill }, 'Skill group updated');
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/skills/:id — admin only */
export async function deleteSkill(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid skill id');
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) throw new ApiError(404, 'Skill group not found');
    return sendSuccess(res, null, 'Skill group deleted');
  } catch (err) {
    next(err);
  }
}
