
import { useEffect, useRef } from 'react';

interface MathRendererProps {
  text: string;
  className?: string;
}

const MathRenderer = ({ text, className = '' }: MathRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      // MathJax is loaded via script tag in index.html
      if (window.MathJax) {
        window.MathJax.typesetClear([containerRef.current]);
        window.MathJax.typesetPromise([containerRef.current]).catch((err) => console.error('MathJax error:', err));
      }
    }
  }, [text]);

  return (
    <div ref={containerRef} className={className}>
      {text}
    </div>
  );
};

export default MathRenderer;
