const fs = require('fs');
const path = require('path');

// Function to modify class names in CSS content based on a list of class names
function modifyCssContent(cssContent, classNames) {
  let totalReplacements = 0; // Initialize a counter for total replacements

  // Sort classNames by length in descending order to replace longer names first
  classNames.sort((a, b) => b.length - a.length);

  classNames.forEach(baseClassName => {
    // Escape special characters for regex pattern
    const escapedBaseClassName = baseClassName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    // Pattern to match the base class name followed by any characters (dynamic part)
    const pattern = new RegExp(`\\.(${escapedBaseClassName})[A-Za-z0-9_-]*`, 'g');

    cssContent = cssContent.replace(pattern, (match, p1) => {
      const replacement = `[class*="${p1}"]`;
      console.log(`Replaced: "${match}" with "${replacement}"`); // Log specific replacements
      totalReplacements++; // Increment for each match replaced
      return replacement; // Replacement text, using only the base class name
    });
  });

  console.log(`Total class name replacements made: ${totalReplacements}`);
  return cssContent;
}

// Function to read, modify, and write the CSS file
function processCssFile(cssFilePath, classNames) {
  fs.readFile(cssFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const modifiedContent = modifyCssContent(data, classNames);

    fs.writeFile(cssFilePath, modifiedContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }

      console.log(`File has been modified successfully: ${cssFilePath}`);
    });
  });
}

// Read the class names from classNames.txt
const classNamesFilePath = path.join(__dirname, 'classNames.txt');
fs.readFile(classNamesFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading class names file:', err);
    return;
  }
  
  const classNames = data.split(/\r?\n/).filter(Boolean); // Split by new line to get an array of class names and filter out empty lines
  const cssFilePath = process.argv[2]; // Get CSS file path from command-line arguments

  if (!cssFilePath) {
    console.error('Please provide a CSS file path as an argument.');
    process.exit(1);
  }

  processCssFile(cssFilePath, classNames);
});
