import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';

function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

/** GET /api/projects — public, sorted by displayOrder then createdAt desc. */
export async function getProjects(req, res, next) {
  try {
    const { featured } = req.query;
    const filter = {};
    if (featured === 'true') filter.featured = true;

    const projects = await Project.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    return sendSuccess(res, { projects }, 'Projects fetched');
  } catch (err) {
    next(err);
  }
}

/** GET /api/projects/:id — public, single project by id or slug. */
export async function getProject(req, res, next) {
  try {
    const { id } = req.params;
    const query = isValidId(id) ? { _id: id } : { slug: id };
    const project = await Project.findOne(query);
    if (!project) throw new ApiError(404, 'Project not found');
    return sendSuccess(res, { project }, 'Project fetched');
  } catch (err) {
    next(err);
  }
}

/** POST /api/projects — admin only. */
export async function createProject(req, res, next) {
  try {
    const project = await Project.create(req.body);
    return sendSuccess(res, { project }, 'Project created', 201);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ApiError(409, 'A project with that slug already exists'));
    }
    next(err);
  }
}

/** PUT /api/projects/:id — admin only, full update. */
export async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid project id');

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) throw new ApiError(404, 'Project not found');

    return sendSuccess(res, { project }, 'Project updated');
  } catch (err) {
    if (err.code === 11000) {
      return next(new ApiError(409, 'A project with that slug already exists'));
    }
    next(err);
  }
}

/** DELETE /api/projects/:id — admin only. */
export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid project id');

    const project = await Project.findByIdAndDelete(id);
    if (!project) throw new ApiError(404, 'Project not found');

    return sendSuccess(res, null, 'Project deleted');
  } catch (err) {
    next(err);
  }
}
