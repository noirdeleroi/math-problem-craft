
import { useEffect } from 'react';

// This hook initializes MathJax
export function useMathJaxInitializer() {
  useEffect(() => {
    // Remove any existing MathJax script
    const existingScript = document.getElementById('MathJax-script');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }
    
    // Create and add the MathJax script
    const script = document.createElement('script');
    script.id = 'MathJax-script';
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    
    // Configure MathJax
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
      }
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup function
      const mathJaxScript = document.getElementById('MathJax-script');
      if (mathJaxScript) {
        document.head.removeChild(mathJaxScript);
      }
    };
  }, []);
}
