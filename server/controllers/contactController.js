import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { sendContactNotification } from '../utils/sendEmail.js';

function isValidId(id) {
  return mongoose.isValidObjectId(id);
}

/** POST /api/contact — public. Save message and (optionally) email notify. */
export async function createContact(req, res, next) {
  try {
    const contact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    // Best-effort email notification; never block submission on SMTP failure.
    const emailStatus = await sendContactNotification(contact);

    return sendSuccess(
      res,
      { id: contact._id },
      'Your message has been received. Thank you!',
      201
    ).end(() => {
      if (emailStatus.sent) console.log('[contact] notification email sent');
    });
  } catch (err) {
    next(err);
  }
}

/** GET /api/contact — admin only. All messages, newest first. */
export async function getContacts(req, res, next) {
  try {
    const { status } = req.query;
    const filter = {};
    if (status === 'unread' || status === 'read') filter.status = status;

    const messages = await Contact.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, { messages }, 'Messages fetched');
  } catch (err) {
    next(err);
  }
}

/** GET /api/contact/:id — admin only. Single message. */
export async function getContact(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid message id');

    const message = await Contact.findById(id);
    if (!message) throw new ApiError(404, 'Message not found');

    return sendSuccess(res, { message }, 'Message fetched');
  } catch (err) {
    next(err);
  }
}

/** PATCH /api/contact/:id — admin only. Update status (e.g. mark as read). */
export async function updateContact(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid message id');

    const message = await Contact.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!message) throw new ApiError(404, 'Message not found');

    return sendSuccess(res, { message }, 'Message updated');
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/contact/:id — admin only. */
export async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) throw new ApiError(400, 'Invalid message id');

    const message = await Contact.findByIdAndDelete(id);
    if (!message) throw new ApiError(404, 'Message not found');

    return sendSuccess(res, null, 'Message deleted');
  } catch (err) {
    next(err);
  }
}
