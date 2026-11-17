import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [150, 'Company name cannot exceed 150 characters'],
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [150, 'Position cannot exceed 150 characters'],
    },
    type: {
      type: String,
      required: [true, 'Employment type is required'],
      trim: true,
      maxlength: [80, 'Type cannot exceed 80 characters'],
    },
    location: {
      type: String,
      default: '',
      trim: true,
      maxlength: [150, 'Location cannot exceed 150 characters'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
      maxlength: [100, 'Duration cannot exceed 100 characters'],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

experienceSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model('Experience', experienceSchema);
