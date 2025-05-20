
import React, { useState, useEffect, useRef } from 'react';
import { convertLatexToHtml } from '../utils/latexUtils';
import MathRenderer from './MathRenderer';

const LatexToHtmlConverter: React.FC = () => {
  const [latexInput, setLatexInput] = useState(`Шаг 1. Построим график функции \\(y=\\frac{2|x|}{x}\\).  
При \\(x>0\\): \\(|x|=x\\), значит \\(y=\\frac{2x}{x}=2\\).  
При \\(x<0\\): \\(|x|=-x\\), значит \\(y=\\frac{2(-x)}{x}=-2\\).

\\begin{enumerate}
  \\item $(-1.5; +\\infty)$
  \\item $(+\\infty; -0.5)$
  \\item $(+\\infty; -1.5)$
  \\item $(-0.5; +\\infty)$
\\end{enumerate}

\\begin{itemize}
  \\item First bullet with $a^2 + b^2 = c^2$
  \\item Second bullet with $E = mc^2$
\\end{itemize}

\\begin{equation}
  f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi
\\end{equation}

\\[
-2<p<2.
\\]`);
  
  const [convertedHtml, setConvertedHtml] = useState('');
  const resultContainerRef = useRef<HTMLDivElement>(null);

  const handleConvert = () => {
    const html = convertLatexToHtml(latexInput);
    setConvertedHtml(html);
  };

  // Effect to typeset math when HTML is updated
  useEffect(() => {
    if (convertedHtml && resultContainerRef.current && window.MathJax) {
      // Let MathJax process the container after the HTML has been injected
      window.MathJax.typesetPromise([resultContainerRef.current]).catch((err) => {
        console.error('MathJax error:', err);
      });
    }
  }, [convertedHtml]);

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
            <div
              ref={resultContainerRef}
              dangerouslySetInnerHTML={{ __html: convertedHtml }}
              className="latex-content"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LatexToHtmlConverter;
