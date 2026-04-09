require('dotenv').config();
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('❌ Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file.');
    process.exit(1);
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('ℹ️  Admin already exists:', email);
    process.exit(0);
  }

  await Admin.create({ email, passwordHash: password });
  console.log(`✅ Admin created: ${email}`);
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error('❌ Seed error:', err.message);
  process.exit(1);
});
