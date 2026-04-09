const Artwork = require('../models/Artwork');
const { cloudinary, uploadToCloudinary } = require('../config/cloudinary');

// @desc  Get all artworks (with optional category / featured filter)
// @route GET /api/artworks
const getArtworks = async (req, res) => {
  const { category, featured } = req.query;
  const filter = {};

  if (category && category !== 'all') filter.category = category;
  if (featured === 'true') filter.featured = true;

  const artworks = await Artwork.find(filter).sort({ createdAt: -1 }).lean();

  res.json({ success: true, count: artworks.length, data: artworks });
};

// @desc  Get single artwork
// @route GET /api/artworks/:id
const getArtwork = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id).lean();

  if (!artwork) {
    return res.status(404).json({ success: false, message: 'Artwork not found.' });
  }

  res.json({ success: true, data: artwork });
};

// @desc  Upload new artwork (admin only)
// @route POST /api/artworks
const createArtwork = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload an image file.' });
  }

  const { title, description, category, tags, featured } = req.body;

  // Upload buffer → Cloudinary
  const result = await uploadToCloudinary(req.file.buffer, {
    folder: 'medusa_artworks',
    transformation: [{ quality: 'auto:best' }],
    resource_type: 'image',
  });

  const artwork = await Artwork.create({
    title,
    description,
    category: category || 'other',
    imageUrl: result.secure_url,
    publicId: result.public_id,
    tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    featured: featured === 'true',
  });

  res.status(201).json({ success: true, data: artwork });
};

// @desc  Delete artwork + remove from Cloudinary (admin only)
// @route DELETE /api/artworks/:id
const deleteArtwork = async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);

  if (!artwork) {
    return res.status(404).json({ success: false, message: 'Artwork not found.' });
  }

  // Remove from Cloudinary first
  await cloudinary.uploader.destroy(artwork.publicId);
  await artwork.deleteOne();

  res.json({ success: true, message: 'Artwork deleted successfully.' });
};

// @desc  Update artwork metadata (admin only)
// @route PATCH /api/artworks/:id
const updateArtwork = async (req, res) => {
  const { title, description, category, tags, featured } = req.body;

  const artwork = await Artwork.findByIdAndUpdate(
    req.params.id,
    {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(category && { category }),
      ...(tags && { tags: tags.split(',').map((t) => t.trim()).filter(Boolean) }),
      ...(featured !== undefined && { featured: featured === 'true' }),
    },
    { new: true, runValidators: true }
  );

  if (!artwork) {
    return res.status(404).json({ success: false, message: 'Artwork not found.' });
  }

  res.json({ success: true, data: artwork });
};

module.exports = { getArtworks, getArtwork, createArtwork, deleteArtwork, updateArtwork };
