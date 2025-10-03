/**
 * Automated Image Optimization Script
 * Run with: npm run optimize-images
 *
 * This script will:
 * 1. Compress all images to ~80% quality
 * 2. Generate WebP versions
 * 3. Create optimized copies in a new "optimized" folder
 * 4. Keep originals untouched (safe!)
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_DIRS = [
  "../public/images/wedding",
  "../public/images/memories/paris",
  "../public/images/memories/budapest",
  "../public/images/memories/boho",
  "../public/images/memories/busan",
  "../public/images/memories/japan",
  "../public/images/memories/okinawa",
];

const OUTPUT_DIR = "../public/images-optimized";

// Configuration
const CONFIG = {
  jpeg: {
    quality: 82, // Sweet spot for quality/size
    progressive: true,
    mozjpeg: true,
  },
  webp: {
    quality: 78, // WebP can be slightly lower quality
    effort: 4, // Compression effort (0-6, higher = smaller but slower)
  },
  maxWidth: 2000, // Max width in pixels (most screens won't need more)
};

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const optimizeImage = async (inputPath, outputDir, filename) => {
  const outputPathJpg = path.join(outputDir, filename);
  const outputPathWebp = path.join(
    outputDir,
    filename.replace(/\.(jpg|jpeg|JPG|JPEG)$/i, ".webp")
  );

  try {
    const originalSize = fs.statSync(inputPath).size;

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();

    // Calculate new dimensions if image is too large
    let width = metadata.width;
    if (width > CONFIG.maxWidth) {
      width = CONFIG.maxWidth;
    }

    // Process JPEG
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .jpeg(CONFIG.jpeg)
      .toFile(outputPathJpg);

    // Process WebP
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp(CONFIG.webp)
      .toFile(outputPathWebp);

    const jpgSize = fs.statSync(outputPathJpg).size;
    const webpSize = fs.statSync(outputPathWebp).size;

    const jpgSavings = (
      ((originalSize - jpgSize) / originalSize) *
      100
    ).toFixed(1);
    const webpSavings = (
      ((originalSize - webpSize) / originalSize) *
      100
    ).toFixed(1);

    return {
      filename,
      originalSize,
      jpgSize,
      webpSize,
      jpgSavings,
      webpSavings,
      success: true,
    };
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return {
      filename,
      success: false,
      error: error.message,
    };
  }
};

const optimizeAll = async () => {
  console.log("🎨 Starting Image Optimization...\n");
  console.log("⚙️  Configuration:");
  console.log(`   JPEG Quality: ${CONFIG.jpeg.quality}%`);
  console.log(`   WebP Quality: ${CONFIG.webp.quality}%`);
  console.log(`   Max Width: ${CONFIG.maxWidth}px`);
  console.log("");
  console.log("=".repeat(80));

  // Create output directory
  const outputRoot = path.join(__dirname, OUTPUT_DIR);
  ensureDir(outputRoot);

  let totalOriginal = 0;
  let totalJpg = 0;
  let totalWebp = 0;
  let processedCount = 0;
  let errorCount = 0;

  for (const dir of IMAGE_DIRS) {
    const inputPath = path.join(__dirname, dir);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${dir} (not found)`);
      continue;
    }

    const categoryName = path.basename(dir);
    const parentDir = path.basename(path.dirname(dir));

    // Create output directory structure
    const outputDir =
      parentDir === "memories"
        ? path.join(outputRoot, "memories", categoryName)
        : path.join(outputRoot, categoryName);

    ensureDir(outputDir);

    const files = fs
      .readdirSync(inputPath)
      .filter((file) => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file));

    if (files.length === 0) continue;

    console.log(`\n📁 Processing ${categoryName} (${files.length} images)...`);

    for (const file of files) {
      const filePath = path.join(inputPath, file);
      const result = await optimizeImage(filePath, outputDir, file);

      if (result.success) {
        totalOriginal += result.originalSize;
        totalJpg += result.jpgSize;
        totalWebp += result.webpSize;
        processedCount++;

        console.log(`   ✅ ${file}`);
        console.log(`      Original: ${formatBytes(result.originalSize)}`);
        console.log(
          `      JPEG: ${formatBytes(result.jpgSize)} (-${result.jpgSavings}%)`
        );
        console.log(
          `      WebP: ${formatBytes(result.webpSize)} (-${
            result.webpSavings
          }%)`
        );
      } else {
        errorCount++;
      }
    }
  }

  // Print summary
  console.log("\n");
  console.log("=".repeat(80));
  console.log("📊 OPTIMIZATION COMPLETE!");
  console.log("=".repeat(80));
  console.log(`✅ Successfully processed: ${processedCount} images`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount}`);
  }
  console.log("");
  console.log("💾 Size Comparison:");
  console.log(`   Original: ${formatBytes(totalOriginal)}`);
  console.log(
    `   Optimized JPEG: ${formatBytes(totalJpg)} (${(
      ((totalOriginal - totalJpg) / totalOriginal) *
      100
    ).toFixed(1)}% smaller)`
  );
  console.log(
    `   WebP: ${formatBytes(totalWebp)} (${(
      ((totalOriginal - totalWebp) / totalOriginal) *
      100
    ).toFixed(1)}% smaller)`
  );
  console.log("");
  console.log("💰 Total Savings:");
  console.log(`   JPEG format: ${formatBytes(totalOriginal - totalJpg)}`);
  console.log(`   WebP format: ${formatBytes(totalOriginal - totalWebp)}`);
  console.log("");
  console.log("📁 Optimized images saved to: public/images-optimized/");
  console.log("");
  console.log("🎉 Next Steps:");
  console.log("   1. Review optimized images in public/images-optimized/");
  console.log("   2. If satisfied, replace original images:");
  console.log(
    "      - Backup originals: mv public/images public/images-backup"
  );
  console.log(
    "      - Use optimized: mv public/images-optimized public/images"
  );
  console.log(
    "   3. Update your code to use OptimizedImage component for WebP support"
  );
  console.log("");
  console.log("=".repeat(80));
};

// Run optimization
try {
  await optimizeAll();
} catch (error) {
  console.error("❌ Fatal error:", error);
  process.exit(1);
}
