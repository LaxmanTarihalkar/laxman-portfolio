import mongoose from 'mongoose';

/**
 * A skill group (e.g. "Frontend Development") with an array of skill names
 * and an icon identifier used by the frontend.
 */
const skillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Group title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    icon: {
      type: String,
      default: 'Layout',
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
      validate: {
        validator: (v) => Array.isArray(v),
        message: 'Skills must be an array',
      },
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

skillSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model('Skill', skillSchema);
