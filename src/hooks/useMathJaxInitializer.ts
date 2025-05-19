
import { useEffect } from 'react';

// Add MathJax type definition
declare global {
  interface Window {
    MathJax: any;
  }
}

export function useMathJaxInitializer() {
  useEffect(() => {
    // Remove any existing MathJax script to avoid duplicates
    const existingScript = document.getElementById('MathJax-script');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Add MathJax script with proper configuration for environments
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    script.id = 'MathJax-script';
    
    // Set MathJax configuration
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEnvironments: true,
        processEscapes: true,
        packages: ['base', 'ams', 'newcommand', 'require', 'autoload', 'configmacros'],
        tags: 'ams'
      },
      options: {
        processHtmlClass: 'tex2jax_process'
      },
      loader: {
        load: ['[tex]/ams', '[tex]/newcommand', '[tex]/configmacros']
      },
      startup: {
        typeset: false
      },
      svg: {
        fontCache: 'global'
      }
    };

    document.head.appendChild(script);

    // Once MathJax is loaded, typeset any existing math
    script.onload = () => {
      if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
      }
    };

    return () => {
      // Remove the script when component unmounts
      const mathJaxScript = document.getElementById('MathJax-script');
      if (mathJaxScript) {
        document.head.removeChild(mathJaxScript);
      }
    };
  }, []);
}
