/**
 * Image Analysis Script
 * Run with: node scripts/analyze-images.js
 *
 * Shows current image sizes and gives optimization recommendations
 */

import fs from "fs";
import path from "path";
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

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const analyzeImages = () => {
  console.log("🔍 Analyzing Images...\n");
  console.log("=".repeat(80));

  let totalSize = 0;
  let totalFiles = 0;
  const categories = {};

  IMAGE_DIRS.forEach((dir) => {
    const fullPath = path.join(__dirname, dir);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Directory not found: ${dir}`);
      return;
    }

    const files = fs
      .readdirSync(fullPath)
      .filter((file) => /\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/i.test(file));

    if (files.length === 0) return;

    const categoryName = path.basename(dir);
    categories[categoryName] = {
      files: [],
      totalSize: 0,
    };

    files.forEach((file) => {
      const filePath = path.join(fullPath, file);
      const stats = fs.statSync(filePath);
      const size = stats.size;

      categories[categoryName].files.push({
        name: file,
        size: size,
      });
      categories[categoryName].totalSize += size;
      totalSize += size;
      totalFiles++;
    });
  });

  // Print results
  console.log(`📊 SUMMARY`);
  console.log("=".repeat(80));
  console.log(`Total Images: ${totalFiles}`);
  console.log(`Total Size: ${formatBytes(totalSize)}`);
  console.log(`Average Size per Image: ${formatBytes(totalSize / totalFiles)}`);
  console.log("");

  // Category breakdown
  console.log(`📁 BY CATEGORY`);
  console.log("=".repeat(80));

  Object.entries(categories).forEach(([category, data]) => {
    const avgSize = data.totalSize / data.files.length;
    console.log(`\n${category.toUpperCase()}`);
    console.log(`  Files: ${data.files.length}`);
    console.log(`  Total: ${formatBytes(data.totalSize)}`);
    console.log(`  Average: ${formatBytes(avgSize)}`);

    // Show 3 largest files
    const sorted = [...data.files].sort((a, b) => b.size - a.size);
    console.log(`  Largest files:`);
    sorted.slice(0, 3).forEach((file) => {
      console.log(`    - ${file.name}: ${formatBytes(file.size)}`);
    });
  });

  // Recommendations
  console.log("\n");
  console.log(`💡 RECOMMENDATIONS`);
  console.log("=".repeat(80));

  const avgSize = totalSize / totalFiles;
  const targetSize = 200 * 1024; // 200KB
  const potentialSavings = Math.max(0, totalSize - targetSize * totalFiles);

  if (avgSize > targetSize) {
    console.log(`\n⚠️  Your images are larger than recommended!`);
    console.log(`   Current average: ${formatBytes(avgSize)}`);
    console.log(`   Target average: ${formatBytes(targetSize)}`);
    console.log(
      `   Potential savings: ${formatBytes(potentialSavings)} (${Math.round(
        (potentialSavings / totalSize) * 100
      )}%)`
    );
    console.log("");
    console.log("   Actions:");
    console.log("   1. Compress images with Squoosh.app or TinyPNG");
    console.log("   2. Convert to WebP format");
    console.log("   3. Generate responsive image sizes");
  } else {
    console.log(`\n✅ Your images are well optimized!`);
    console.log(`   Average size: ${formatBytes(avgSize)}`);
  }

  // Load time estimates
  console.log("\n");
  console.log(`⏱️  LOAD TIME ESTIMATES (loading all images)`);
  console.log("=".repeat(80));

  const speeds = {
    "3G (750 Kbps)": (750 * 1024) / 8,
    "4G (10 Mbps)": (10 * 1024 * 1024) / 8,
    "WiFi (50 Mbps)": (50 * 1024 * 1024) / 8,
  };

  Object.entries(speeds).forEach(([name, bytesPerSec]) => {
    const currentTime = totalSize / bytesPerSec;
    const optimizedTime = (targetSize * totalFiles) / bytesPerSec;
    console.log(`  ${name}:`);
    console.log(`    Current: ${currentTime.toFixed(1)}s`);
    console.log(`    After optimization: ${optimizedTime.toFixed(1)}s`);
  });

  console.log("\n");
  console.log("=".repeat(80));
  console.log(
    '💡 Run "npm run optimize-images" to start optimization (coming soon)'
  );
  console.log("📖 Read IMAGE_OPTIMIZATION_GUIDE.md for detailed instructions");
  console.log("=".repeat(80));
};

try {
  analyzeImages();
} catch (error) {
  console.error("❌ Error analyzing images:", error.message);
  process.exit(1);
}
