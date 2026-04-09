/**
 * Builds an optimized Cloudinary URL with quality and format auto-transformation.
 * Applies q_auto:best and f_auto for lossless quality + optimal format (WebP/AVIF).
 *
 * @param {string} url - The original Cloudinary secure URL
 * @param {Object} [options] - Additional transformation options
 * @param {number} [options.width] - Target width (for responsive)
 * @param {string} [options.crop] - Crop mode (e.g., 'fill', 'limit')
 * @returns {string} - Transformed Cloudinary URL
 */
export const buildCloudinaryUrl = (url, options = {}) => {
  if (!url) return '';
  // Pass through non-Cloudinary URLs (e.g. Unsplash, external) unchanged
  if (!url.includes('cloudinary.com')) return url;

  const { width, crop } = options;

  const transforms = ['q_auto:best', 'f_auto'];
  if (width) transforms.push(`w_${width}`);
  if (crop) transforms.push(`c_${crop}`);

  const transformString = transforms.join(',');

  // Insert transforms after /upload/
  return url.replace('/upload/', `/upload/${transformString}/`);
};

/**
 * Builds a thumbnail variant of a Cloudinary URL.
 * @param {string} url - Original Cloudinary URL
 * @param {number} [size=400] - Max width
 */
export const buildThumbnailUrl = (url, size = 400) =>
  buildCloudinaryUrl(url, { width: size, crop: 'limit' });
