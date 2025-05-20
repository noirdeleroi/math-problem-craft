
/// <reference types="vite/client" />

interface Window {
  MathJax?: {
    typesetPromise: (elements: HTMLElement[]) => Promise<void>;
    tex: {
      inlineMath: string[][];
      displayMath: string[][];
      processEscapes: boolean;
    };
    options: {
      skipHtmlTags: string[];
    };
  };
}
