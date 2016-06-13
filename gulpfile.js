const gulp = require('gulp');
const shell = require('gulp-shell');
const fs = require('fs');
const os = require('os');

gulp.task('run', shell.task(['react-native run-android']));

gulp.task('start', shell.task(['react-native start']));

gulp.task('clear-cache', function () {
  // Clear react-packager cache
  const tempDir = os.tmpdir();

  const cacheFiles = fs.readdirSync(tempDir).filter(function (fileName) {
    return fileName.indexOf('react-packager-cache') === 0;
  });

  cacheFiles.forEach(function (cacheFile) {
    var cacheFilePath = path.join(tempDir, cacheFile);
    fs.unlinkSync(cacheFilePath);
    console.log('Deleted cache: ', cacheFilePath);
  });

  if (!cacheFiles.length) {
    console.log('No cache files found!');
  }
});