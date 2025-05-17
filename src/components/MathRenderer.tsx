
import { useEffect, useRef } from 'react';

interface MathRendererProps {
  text: string;
  className?: string;
}

const MathRenderer = ({ text, className = '' }: MathRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      // MathJax is loaded via script tag in Index.tsx
      if (window.MathJax) {
        try {
          // Make sure to clear any previous typesetting
          window.MathJax.typesetClear([containerRef.current]);
          
          // Wait for the next tick to ensure content is in the DOM
          setTimeout(() => {
            window.MathJax.typesetPromise([containerRef.current]).catch((err: any) => 
              console.error('MathJax error:', err)
            );
          }, 0);
        } catch (error) {
          console.error('Error rendering math:', error);
        }
      } else {
        console.warn('MathJax not found in window object');
      }
    }
  }, [text]);

  return (
    <div ref={containerRef} className={`tex2jax_process ${className}`}>
      {text}
    </div>
  );
};

export default MathRenderer;
