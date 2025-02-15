import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minlength: [3, 'User name must be at least 3 characters long'],
    maxlength: [100, 'User name must be less than 100 characters long'],
  },
  email: {
    type: String,
    required: [true, 'User email is required'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User password is required'],
    trim: true,
    minlength: [6, 'User password must be at least 6 characters long'],
  },
  role: [{
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: ['user']
  }],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export { User };
