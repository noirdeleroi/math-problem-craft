
import React, { useState } from 'react';
import { convertLatexEnumerateToHtml } from '../utils/latexUtils';
import MathRenderer from './MathRenderer';

const LatexToHtmlConverter: React.FC = () => {
  const [latexInput, setLatexInput] = useState(`\\begin{enumerate}
  \\item $y = x^2 - 5x + 3$
  \\item $y = -x^2 + 5x - 3$
  \\item $y = x^2 + 5x + 3$
\\end{enumerate}`);
  
  const [convertedHtml, setConvertedHtml] = useState('');

  const handleConvert = () => {
    const html = convertLatexEnumerateToHtml(latexInput);
    setConvertedHtml(html);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">LaTeX to HTML Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="latex-input" className="block text-sm font-medium mb-2">
            LaTeX Input
          </label>
          <textarea
            id="latex-input"
            className="w-full h-64 p-2 border border-gray-300 rounded-md"
            value={latexInput}
            onChange={(e) => setLatexInput(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            HTML Output
          </label>
          <div className="w-full h-64 p-2 border border-gray-300 rounded-md overflow-y-auto bg-gray-50">
            <pre className="text-sm">{convertedHtml}</pre>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleConvert}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Convert
        </button>
      </div>
      
      {convertedHtml && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Rendered Result:</h3>
          <div className="p-4 border border-gray-300 rounded-md">
            <MathRenderer text={convertedHtml} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LatexToHtmlConverter;
