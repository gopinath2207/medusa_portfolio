// Vercel's native api/ directory convention:
// Any file here is automatically a serverless function.
// This re-exports our full Express app so all /api/* routes are handled.
module.exports = require('../server/api/index');
