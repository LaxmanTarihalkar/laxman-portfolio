import mongoose from 'mongoose';

/**
 * A single-document model for the About section content.
 * We always read/update the first (and only) document.
 */
const aboutSchema = new mongoose.Schema(
  {
    paragraphs: {
      type: [String],
      default: [],
    },
    facts: {
      type: [
        {
          label: { type: String, trim: true },
          value: { type: String, trim: true },
        },
      ],
      default: [],
    },
    profileImage: {
      type: String,
      default: '/images/Laxman-Tarihalkar-img.png',
      trim: true,
    },
  },
  { timestamps: true }
);

aboutSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export default mongoose.model('About', aboutSchema);
