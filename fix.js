const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modifiedFiles = 0;

walkDir('./src', function (filePath) {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');

        let newContent = content
            // Handle the dark backgrounds inside glass panels
            .replace(/'rgba\(26, ?29, ?39, ?0\.4\)'/g, "'var(--glass-panel-bg)'")

            // Handle transparent whites
            .replace(/'rgba\(255, ?255, ?255, ?0\.05\)'/g, "'var(--glass-opacity-5)'")
            .replace(/'rgba\(255, ?255, ?255, ?0\.02\)'/g, "'var(--glass-opacity-2)'")

            // Handle transparent blacks
            .replace(/'rgba\(0, ?0, ?0, ?0\.2\)'/g, "'var(--glass-opacity-10)'")

            // Handle Hardcoded whites
            .replace(/color:\s*'white'/g, "color: 'var(--text-primary)'")
            .replace(/color="white"/g, 'color="var(--text-primary)"')
            .replace(/>white</g, '>var(--text-primary)<') // not needed if it's react string
            .replace(/color: isActive \? 'white'/g, "color: isActive ? 'var(--text-primary)'")
            .replace(/color: activeSegment === id \? 'white'/g, "color: activeSegment === id ? 'var(--text-primary)'")
            .replace(/color: activeTab === id \? 'white'/g, "color: activeTab === id ? 'var(--text-primary)'");

        // Also handle specific complex ternary operators
        newContent = newContent.replace(
            /color={isActive \? item\.color \|\| 'white' : 'currentColor'}/g,
            "color={isActive ? item.color || 'var(--text-primary)' : 'currentColor'}"
        );

        newContent = newContent.replace(
            /color={isActive \? item\.color \|\| 'white' : 'var\(--text-secondary\)'}/g,
            "color={isActive ? item.color || 'var(--text-primary)' : 'var(--text-secondary)'}"
        );

        newContent = newContent.replace(
            /color={activeTab === id \? 'white' : 'var\(--text-secondary\)'}/g,
            "color={activeTab === id ? 'var(--text-primary)' : 'var(--text-secondary)'}"
        );

        newContent = newContent.replace(
            /color={activeSegment === id \? 'white' : 'var\(--text-secondary\)'}/g,
            "color={activeSegment === id ? 'var(--text-primary)' : 'var(--text-secondary)'}"
        );

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Fixed colors in:', filePath);
            modifiedFiles++;
        }
    }
});

console.log(`Finished fixing ${modifiedFiles} files.`);
