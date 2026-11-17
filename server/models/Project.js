import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9-]+$/,
        'Slug must be lowercase letters, numbers, and hyphens only',
      ],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    technologies: {
      type: [String],
      default: [],
      validate: {
        validator: (v) => Array.isArray(v),
        message: 'Technologies must be an array',
      },
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    githubUrl: {
      type: String,
      default: '',
      trim: true,
      validate: {
        validator: (v) => !v || /^https?:\/\//.test(v),
        message: 'GitHub URL must start with http(s)://',
      },
    },
    liveUrl: {
      type: String,
      default: '',
      trim: true,
      validate: {
        validator: (v) => !v || /^https?:\/\//.test(v),
        message: 'Live URL must start with http(s)://',
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

projectSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model('Project', projectSchema);
