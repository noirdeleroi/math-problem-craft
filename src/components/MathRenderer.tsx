
import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

interface MathRendererProps {
  text: string;
  className?: string;
}

const MathRenderer = ({ text, className = '' }: MathRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !text) return;
    
    try {
      // Process the text to find and render LaTeX expressions
      const processedText = text.replace(/\$(.*?)\$/g, (match, formula) => {
        const span = document.createElement('span');
        katex.render(formula, span, {
          throwOnError: false,
          displayMode: false
        });
        return span.outerHTML;
      }).replace(/\$\$(.*?)\$\$/g, (match, formula) => {
        const span = document.createElement('span');
        katex.render(formula, span, {
          throwOnError: false,
          displayMode: true
        });
        return span.outerHTML;
      });
      
      containerRef.current.innerHTML = processedText;
    } catch (error) {
      console.error('Error rendering math:', error);
      containerRef.current.textContent = text;
    }
  }, [text]);

  return (
    <div ref={containerRef} className={className}>
      {!text && ''}
    </div>
  );
};

export default MathRenderer;
