
import { useEffect } from 'react';

// This hook is kept for backward compatibility but now simply loads KaTeX CSS
export function useMathJaxInitializer() {
  useEffect(() => {
    // Remove any existing MathJax script
    const existingScript = document.getElementById('MathJax-script');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }
    
    // We don't need to add any script here since KaTeX is loaded via npm
    // and the CSS is imported in the MathRenderer component
    
    return () => {
      // Cleanup function remains for consistency
    };
  }, []);
}
