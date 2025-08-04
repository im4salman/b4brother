import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the SVG logo file
const logoSvgPath = path.join(__dirname, '../src/assets/b4-brothers-logo.svg');
const logoSimpleSvgPath = path.join(__dirname, '../src/assets/b4-brothers-logo-simple.svg');

// Create PNG version using base64 encoding (for web compatibility)
function createPngFromSvg() {
    try {
        // Read the full logo SVG
        const logoSvg = fs.readFileSync(logoSvgPath, 'utf8');
        const logoSimpleSvg = fs.readFileSync(logoSimpleSvgPath, 'utf8');
        
        // Create HTML file to convert SVG to PNG using browser's canvas API
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>SVG to PNG Converter</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .container { margin: 20px 0; }
        canvas { border: 1px solid #ccc; margin: 10px 0; }
        .download-link { display: inline-block; margin: 10px; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>B4 Brothers Logo PNG Generator</h1>
    
    <div class="container">
        <h2>Full Logo (400x150px)</h2>
        <div id="logo-full">${logoSvg}</div>
        <canvas id="canvas-full" width="400" height="150"></canvas>
        <br>
        <a id="download-full" class="download-link" download="b4-brothers-logo.png">Download Full Logo PNG</a>
    </div>
    
    <div class="container">
        <h2>Simple Logo (200x200px)</h2>
        <div id="logo-simple">${logoSimpleSvg}</div>
        <canvas id="canvas-simple" width="200" height="200"></canvas>
        <br>
        <a id="download-simple" class="download-link" download="b4-brothers-logo-simple.png">Download Simple Logo PNG</a>
    </div>

    <script>
        function convertSvgToPng(svgElement, canvas, downloadLink) {
            const ctx = canvas.getContext('2d');
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const img = new Image();
            img.onload = function() {
                // Clear canvas with white background
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw the image
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Create download link
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    downloadLink.href = url;
                });
                
                URL.revokeObjectURL(svgUrl);
            };
            img.src = svgUrl;
        }
        
        // Convert full logo
        const fullLogoSvg = document.querySelector('#logo-full svg');
        const fullCanvas = document.getElementById('canvas-full');
        const fullDownload = document.getElementById('download-full');
        
        if (fullLogoSvg) {
            convertSvgToPng(fullLogoSvg, fullCanvas, fullDownload);
        }
        
        // Convert simple logo
        const simpleLogoSvg = document.querySelector('#logo-simple svg');
        const simpleCanvas = document.getElementById('canvas-simple');
        const simpleDownload = document.getElementById('download-simple');
        
        if (simpleLogoSvg) {
            convertSvgToPng(simpleLogoSvg, simpleCanvas, simpleDownload);
        }
    </script>
</body>
</html>
        `;
        
        // Write the HTML file
        const outputPath = path.join(__dirname, '../logo-png-generator.html');
        fs.writeFileSync(outputPath, htmlContent);
        
        console.log('✅ PNG logo generator created successfully!');
        console.log('📄 Open logo-png-generator.html in your browser to download PNG versions');
        console.log('🔗 File location:', outputPath);
        
    } catch (error) {
        console.error('❌ Error creating PNG logo:', error);
    }
}

createPngFromSvg();
