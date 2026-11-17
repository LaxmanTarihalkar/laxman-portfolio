import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
  },
  { timestamps: true }
);

// Hash the password before saving whenever it changes.
adminSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Compare a plaintext password with the stored hash.
adminSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

// Never return the password hash in JSON responses.
adminSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.__v;
  return obj;
};

export default mongoose.model('Admin', adminSchema);
