const mongoose = require('mongoose');

const commissionRequestSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    commissionType: {
      type: String,
      enum: ['portrait', 'automotive', 'custom'],
      required: [true, 'Commission type is required'],
    },
    size: {
      type: String,
      enum: ['A4', 'A3', 'A2', 'Custom'],
      default: 'A4',
    },
    vision: {
      type: String,
      required: [true, 'Please describe your vision'],
      trim: true,
      maxlength: [2000, 'Vision description cannot exceed 2000 characters'],
    },
    referenceImages: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'in-review', 'accepted', 'completed', 'declined'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CommissionRequest', commissionRequestSchema);
