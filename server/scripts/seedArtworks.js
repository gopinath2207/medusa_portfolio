require('dotenv').config();
require('../config/cloudinary'); // initialize
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Artwork = require('../models/Artwork');

// Sample demo artworks using free Unsplash graphite/pencil art images
const demoArtworks = [
  {
    title: 'Ethereal Gaze',
    description: 'A hyperrealistic graphite study capturing the soulful depth of human eyes.',
    category: 'portraits',
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=85',
    publicId: 'demo_portrait_1',
    tags: ['graphite', 'portrait', 'eyes', 'realistic'],
    featured: true,
  },
  {
    title: 'Chrome Dreams',
    description: `A '69 Mustang rendered in full monochromatic graphite — every chrome detail captured.`,
    category: 'automotive',
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=85',
    publicId: 'demo_auto_1',
    tags: ['automotive', 'graphite', 'mustang', 'monochromatic'],
    featured: true,
  },
  {
    title: 'Frida Study',
    description: 'A tribute portrait of Frida Kahlo, rendered in soft graphite with intricate detail.',
    category: 'portraits',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=85',
    publicId: 'demo_portrait_2',
    tags: ['portrait', 'graphite', 'tribute', 'women'],
    featured: false,
  },
  {
    title: 'Velocity',
    description: 'A Formula 1 car mid-race, the motion blur captured through hatching technique.',
    category: 'automotive',
    imageUrl: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&q=85',
    publicId: 'demo_auto_2',
    tags: ['automotive', 'f1', 'racing', 'graphite'],
    featured: true,
  },
  {
    title: 'Tender Shadows',
    description: 'A custom family portrait — three generations captured in gentle monochromatic tones.',
    category: 'custom',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=85',
    publicId: 'demo_custom_1',
    tags: ['custom', 'portrait', 'family', 'monochromatic'],
    featured: false,
  },
  {
    title: 'Serenity',
    description: 'A peaceful female portrait bathed in soft directional light, graphite on A3 cartridge paper.',
    category: 'portraits',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85',
    publicId: 'demo_portrait_3',
    tags: ['portrait', 'graphite', 'soft light', 'woman'],
    featured: true,
  },
  {
    title: 'Iron Beast',
    description: 'A Land Rover Defender rendered with obsessive detail — every bolt, every scratch.',
    category: 'automotive',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
    publicId: 'demo_auto_3',
    tags: ['automotive', 'defender', 'graphite', 'offroad'],
    featured: false,
  },
  {
    title: 'The Thinker',
    description: 'A contemplative male portrait — dramatic Rembrandt lighting reimagined in graphite.',
    category: 'portraits',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=85',
    publicId: 'demo_portrait_4',
    tags: ['portrait', 'graphite', 'male', 'dramatic light'],
    featured: false,
  },
];

const seedArtworks = async () => {
  await connectDB();

  const count = await Artwork.countDocuments();
  if (count > 0) {
    console.log(`ℹ️  ${count} artworks already exist. Skipping seed.`);
    console.log('   To re-seed, manually clear the artworks collection first.');
    process.exit(0);
  }

  await Artwork.insertMany(demoArtworks);
  console.log(`✅ Seeded ${demoArtworks.length} demo artworks successfully!`);
  process.exit(0);
};

seedArtworks().catch((err) => {
  console.error('❌ Artwork seed error:', err.message);
  process.exit(1);
});
