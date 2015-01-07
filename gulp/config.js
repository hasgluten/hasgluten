var dest = './hasgluten.github.io',
  src = './src'
  mui = './components/material-ui/src';

module.exports = {
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest, src]
    },
    files: [
      dest + '/**'
    ]
  },
  less: {
    src: src + '/less/main.less',
    watch: [
      src + '/less/**',
      mui + '/less/**'
    ],
    dest: dest
  },
  markup: {
    src: src + "/www/**",
    dest: dest
  },
  fonts: {
    src: mui + '/less/material-design-fonticons/fonts/**',
    dest: dest + '/fonts/mdfonticon'
  },
  muiFonts: {
    src: mui + '/less/material-ui-icons/fonts/**',
    dest: dest + '/fonts'
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/main.js',
      dest: dest,
      outputName: 'main.js'
    }]
  }
};
