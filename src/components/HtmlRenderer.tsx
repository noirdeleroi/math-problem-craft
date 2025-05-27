
import React, { useEffect, useRef } from 'react';

interface HtmlRendererProps {
  html: string;
  className?: string;
  enableMathJax?: boolean;
}

const HtmlRenderer = ({ html, className = '', enableMathJax = true }: HtmlRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;
    
    // Set the HTML content
    containerRef.current.innerHTML = html;
    
    // If MathJax is enabled and available, process the content
    if (enableMathJax && window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([containerRef.current]).catch((err) => {
        console.error('MathJax error:', err);
      });
    }
  }, [html, enableMathJax]);

  return (
    <div 
      ref={containerRef} 
      className={`rendered-content ${className}`}
      style={{
        lineHeight: '1.6',
        wordBreak: 'break-word'
      }}
    />
  );
};

export default HtmlRenderer;
