const fs = require('fs');
const css = fs.readFileSync('/Users/valfiles/dev/php-projects/wiz/WebDevProj/indexstyle.css', 'utf-8');

// Replace body with .wiz-replica-container
let scopedCss = css.replace(/(^|\n)body\s*\{/g, '\n.wiz-replica-container {');
// Replace * with .wiz-replica-container *
scopedCss = scopedCss.replace(/(^|\n)\*\s*\{/g, '\n.wiz-replica-container * {');

// Prefix other top-level rules
scopedCss = scopedCss.replace(/(^|\n)([a-zA-Z\.\#][^{}]*?)\s*\{/g, (match, p1, p2) => {
    if (p2.trim() === '.wiz-replica-container' || p2.trim() === '.wiz-replica-container *') return match;
    if (p2.includes('@')) return match; // skip @keyframes, @media
    
    const selectors = p2.split(',').map(s => {
        if (s.trim().startsWith('@')) return s;
        return `.wiz-replica-container ${s.trim()}`;
    }).join(', ');
    return `${p1}${selectors} {`;
});

// Write to WizApp.css
fs.writeFileSync('src/components/wiz/WizApp.css', scopedCss);
console.log('CSS prefixed successfully');
