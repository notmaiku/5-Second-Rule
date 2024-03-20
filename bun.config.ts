const path = require('path');

module.exports = {
  entry: './src/main.ts', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle filename
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue'], // Resolve extensions for TypeScript and Vue files
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for src directory
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // Vue files
        loader: 'vue-loader', // Use vue-loader for Vue files
      },
      {
        test: /\.ts$/, // TypeScript files
        loader: 'ts-loader', // Use ts-loader for TypeScript files
        options: {
          appendTsSuffixTo: [/\.vue$/], // Append '.ts' suffix to Vue files
        },
      },
      // Add other loaders for CSS, images, etc. as needed
    ],
  },
};
  
