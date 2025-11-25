import React, { useState } from 'react';

function TextToSVG() {
  const [inputText, setInputText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [textSize, setTextSize] = useState(24);
  const [selectedBorder, setSelectedBorder] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    setTextColor(color);
    setSelectedBorder(`1px solid ${color}`);
  };

  const handleSizeChange = (event) => {
    setTextSize(event.target.value);
  };

  const handleBorderChange = (event) => {
    setSelectedBorder(event.target.value);
  };

  const downloadSVG = () => {
    const svg = `
      <svg id="output-svg" width="400" height="100" style="border: ${selectedBorder};">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="${textColor}" fontWeight="bold" fontSize="${textSize}">
          ${inputText}
        </text>
      </svg>
    `;
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text_to_svg.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

 const copySVGCode = () => {
  const svgCode = `
    <svg id="output-svg" width="400" height="100" style="border: ${selectedBorder};">
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="${textColor}" fontWeight="bold" fontSize="${textSize}">
        ${inputText}
      </text>
    </svg>
  `;
  navigator.clipboard.writeText(svgCode);
  setCopied(true);
};


  return (
    <div style={{ textAlign: 'center' }}>
      <h1>TEXT TO SVG</h1>
      <textarea
        rows="1"
        cols="30"
        value={inputText}
        onChange={handleChange}
        placeholder="Enter text here..."
        style={{ marginBottom: '20px' }}
      />
      <br />
      <label htmlFor="color">Color:</label>
      <input
        type="color"
        id="color"
        value={textColor}
        onChange={handleColorChange}
        style={{ marginBottom: '20px', marginLeft: '10px' }}
      />
      <br />
      <label htmlFor="size">Size:</label>
      <input
        type="range"
        id="size"
        min="12"
        max="48"
        value={textSize}
        onChange={handleSizeChange}
        style={{ marginBottom: '20px', marginLeft: '10px' }}
      />
      <br />
      <label htmlFor="border">Border:</label>
      <select id="border" onChange={handleBorderChange} style={{ marginBottom: '20px', marginLeft: '10px' }}>
        <option value="">None</option>
        <option value={`1px solid ${textColor}`}>Solid</option>
        <option value={`2px dashed ${textColor}`}>Dashed</option>
        <option value={`3px dotted ${textColor}`}>Dotted</option>
      </select>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <svg id="output-svg" width="400" height="100" style={{ border: selectedBorder }}>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={textColor} fontWeight="bold" fontSize={textSize}>
            {inputText}
          </text>
        </svg>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={downloadSVG} style={{ marginRight: '10px' }}>
          Download SVG
        </button>
        <button onClick={copySVGCode}>
          {copied ? 'Copied!' : 'Copy SVG Code'}
        </button>
      </div>
      {copied && <p>SVG code copied to clipboard!</p>}
    </div>
  );
}

export default TextToSVG;













