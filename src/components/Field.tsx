
import { useState, useEffect } from 'react';
import MathRenderer from './MathRenderer';
import HtmlRenderer from './HtmlRenderer';
import { useLatexConverter } from '../hooks/useLatexConverter';

interface FieldProps {
  label: string;
  value: string;
  onFieldClick: (value: string) => void;
}

const Field = ({ label, value, onFieldClick }: FieldProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [convertedHtml, setConvertedHtml] = useState<string>('');
  const [useHtmlRenderer, setUseHtmlRenderer] = useState(false);
  const { convertLatexToHtml, isConverting } = useLatexConverter();

  // Check if content has complex LaTeX that should be converted to HTML
  const hasComplexLatex = value && (
    /\\begin\{(enumerate|itemize|tabular|center|equation|align|document)\}/.test(value) ||
    /\\section/.test(value) ||
    /\\subsection/.test(value) ||
    /\\textbf/.test(value) ||
    /\\item/.test(value) ||
    /\\\[/.test(value) ||
    value.includes('\n\n')
  );

  useEffect(() => {
    const shouldConvert = hasComplexLatex && ['problem_text', 'answer', 'solution_text', 'solutiontextexpanded'].includes(label);
    
    if (shouldConvert && value) {
      convertLatexToHtml(value, { mathjax: true, standalone: false })
        .then(result => {
          if (result.success) {
            setConvertedHtml(result.html);
            setUseHtmlRenderer(true);
          } else {
            console.warn('LaTeX conversion failed, falling back to MathJax:', result.error);
            setUseHtmlRenderer(false);
          }
        })
        .catch(error => {
          console.error('Error converting LaTeX:', error);
          setUseHtmlRenderer(false);
        });
    } else {
      setUseHtmlRenderer(false);
      setConvertedHtml('');
    }
  }, [value, label, hasComplexLatex, convertLatexToHtml]);

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-1">{label}</h3>
      <div
        className={`p-3 rounded-md transition-colors cursor-pointer ${
          isHovered ? 'bg-hoverOrange bg-opacity-10' : 'bg-lightGray'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onFieldClick(value)}
      >
        {label === 'problem_image' && value ? (
          <img src={value} alt="Problem" className="max-w-full h-auto" />
        ) : isConverting ? (
          <div className="text-gray-500 italic">Converting LaTeX...</div>
        ) : useHtmlRenderer && convertedHtml ? (
          <HtmlRenderer 
            html={convertedHtml} 
            className="break-words" 
            enableMathJax={true}
          />
        ) : (
          <MathRenderer text={value || ''} className="break-words" />
        )}
      </div>
    </div>
  );
};

export default Field;
