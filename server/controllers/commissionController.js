const CommissionRequest = require('../models/CommissionRequest');
const { uploadToCloudinary } = require('../config/cloudinary');

// @desc  Submit a commission request (public)
// @route POST /api/commissions
const createCommission = async (req, res) => {
  const { clientName, email, commissionType, size, vision } = req.body;

  // Upload any reference images from memory buffers → Cloudinary
  let referenceImages = [];
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, {
        folder: 'medusa_references',
        transformation: [{ quality: 'auto:good' }],
        resource_type: 'image',
      })
    );
    const results = await Promise.all(uploadPromises);
    referenceImages = results.map((r) => ({ url: r.secure_url, publicId: r.public_id }));
  }

  const commission = await CommissionRequest.create({
    clientName,
    email,
    commissionType,
    size,
    vision,
    referenceImages,
  });

  res.status(201).json({
    success: true,
    message: "Your commission request has been received! I'll be in touch soon.",
    data: { id: commission._id },
  });
};

// @desc  Get all commissions (admin only, paginated)
// @route GET /api/commissions
const getCommissions = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const [commissions, total] = await Promise.all([
    CommissionRequest.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    CommissionRequest.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: commissions.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: commissions,
  });
};

// @desc  Update commission status (admin only)
// @route PATCH /api/commissions/:id/status
const updateCommissionStatus = async (req, res) => {
  const { status } = req.body;

  const validStatuses = ['pending', 'in-review', 'accepted', 'completed', 'declined'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value.' });
  }

  const commission = await CommissionRequest.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!commission) {
    return res.status(404).json({ success: false, message: 'Commission not found.' });
  }

  res.json({ success: true, data: commission });
};

// @desc  Get single commission (admin only)
// @route GET /api/commissions/:id
const getCommission = async (req, res) => {
  const commission = await CommissionRequest.findById(req.params.id).lean();
  if (!commission) {
    return res.status(404).json({ success: false, message: 'Commission not found.' });
  }
  res.json({ success: true, data: commission });
};

module.exports = { createCommission, getCommissions, updateCommissionStatus, getCommission };
