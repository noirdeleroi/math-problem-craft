
import { useState } from 'react';
import MathRenderer from './MathRenderer';
import { convertLatexTextToHtml } from '../utils/latexUtils';

interface FieldProps {
  label: string;
  value: string;
  onFieldClick: (value: string) => void;
}

const Field = ({ label, value, onFieldClick }: FieldProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Convert LaTeX environments to HTML before rendering
  const processedValue = ['problem_text', 'answer', 'solution_text'].includes(label)
    ? convertLatexTextToHtml(value)
    : value;
  

  
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
        ) : hasLatexEnvironments ? (
          <div 
            dangerouslySetInnerHTML={{ __html: processedValue || '' }} 
            className="latex-content"
          />
        ) : (
          <MathRenderer text={processedValue || ''} className="break-words" />
        )}
      </div>
    </div>
  );
};

export default Field;
