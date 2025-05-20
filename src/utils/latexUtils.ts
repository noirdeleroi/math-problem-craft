
/**
 * Converts LaTeX enumerate environments to HTML ordered lists
 * while preserving math expressions for MathJax rendering.
 * 
 * @param latexString LaTeX string containing \begin{enumerate} environment
 * @returns HTML string with properly formatted ordered list and MathJax delimiters
 */
export function convertLatexEnumerateToHtml(latexString: string): string {
  if (!latexString) return '';
  
  // Check if the string contains an enumerate environment
  if (!latexString.includes('\\begin{enumerate}') || !latexString.includes('\\end{enumerate}')) {
    return latexString; // Return original if no enumerate environment found
  }

  try {
    // Extract the content between \begin{enumerate} and \end{enumerate}
    const match = latexString.match(/\\begin{enumerate}([\s\S]*?)\\end{enumerate}/);
    
    if (!match || !match[1]) {
      return latexString; // Return original if no match
    }
    
    const itemsContent = match[1];
    
    // Split by \item and remove empty entries
    const items = itemsContent
      .split('\\item')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Generate the HTML list
    let htmlOutput = '<ol>';
    
    items.forEach(item => {
      // Convert $...$ to \(...\) for MathJax inline math
      let processedItem = item;
      
      // Handle both $...$ and already formatted \(...\) math
      processedItem = processedItem.replace(/\$(.*?)\$/g, '\\($1\\)');
      
      htmlOutput += `\n  <li>${processedItem}</li>`;
    });
    
    htmlOutput += '\n</ol>';
    
    // Replace the entire enumerate environment with the HTML list
    return latexString.replace(/\\begin{enumerate}[\s\S]*?\\end{enumerate}/, htmlOutput);
  } catch (error) {
    console.error('Error converting LaTeX enumerate to HTML:', error);
    return latexString; // Return original if error
  }
}
