
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

/**
 * Converts LaTeX tabular environments to HTML tables
 * while preserving math expressions for MathJax rendering.
 * 
 * @param latexString LaTeX string containing \begin{tabular} environment
 * @returns HTML string with properly formatted table and MathJax delimiters
 */
export function convertLatexTabularToHtml(latexString: string): string {
  if (!latexString) return '';
  
  // Check if the string contains a tabular environment
  if (!latexString.includes('\\begin{tabular}') || !latexString.includes('\\end{tabular}')) {
    return latexString; // Return original if no tabular environment found
  }

  try {
    // Extract the content between \begin{tabular}{columns} and \end{tabular}
    const fullMatch = latexString.match(/\\begin{tabular}{([^}]*)}\s*([\s\S]*?)\\end{tabular}/);
    
    if (!fullMatch || !fullMatch[2]) {
      return latexString; // Return original if no match
    }
    
    // Column format is in fullMatch[1] (like {lcr}) but we just need the content
    const tableContent = fullMatch[2];
    
    // Split by \\ to get rows
    const rows = tableContent.split('\\\\').map(row => row.trim()).filter(row => row.length > 0);
    
    // Generate the HTML table
    let htmlOutput = '<table class="border-collapse border border-gray-300">';
    
    rows.forEach(row => {
      htmlOutput += '\n  <tr>';
      
      // Split by & to get cells
      const cells = row.split('&').map(cell => cell.trim());
      
      cells.forEach(cell => {
        // Convert $...$ to \(...\) for MathJax inline math
        let processedCell = cell;
        processedCell = processedCell.replace(/\$(.*?)\$/g, '\\($1\\)');
        
        // Handle \hline (horizontal line) by adding a border-top class
        const hasHline = row.includes('\\hline');
        const borderClass = hasHline ? ' class="border-t border-gray-300"' : '';
        
        htmlOutput += `\n    <td${borderClass} class="border border-gray-300 px-2 py-1">${processedCell}</td>`;
      });
      
      htmlOutput += '\n  </tr>';
    });
    
    htmlOutput += '\n</table>';
    
    // Replace the entire tabular environment with the HTML table
    return latexString.replace(/\\begin{tabular}{[^}]*}[\s\S]*?\\end{tabular}/, htmlOutput);
  } catch (error) {
    console.error('Error converting LaTeX tabular to HTML:', error);
    return latexString; // Return original if error
  }
}

/**
 * Converts LaTeX center environments to HTML centered content
 * while preserving math expressions for MathJax rendering.
 * 
 * @param latexString LaTeX string containing \begin{center} environment
 * @returns HTML string with properly centered content and MathJax delimiters
 */
export function convertLatexCenterToHtml(latexString: string): string {
  if (!latexString) return '';
  
  // Check if the string contains a center environment
  if (!latexString.includes('\\begin{center}') || !latexString.includes('\\end{center}')) {
    return latexString; // Return original if no center environment found
  }

  try {
    // Extract the content between \begin{center} and \end{center}
    const match = latexString.match(/\\begin{center}([\s\S]*?)\\end{center}/);
    
    if (!match || !match[1]) {
      return latexString; // Return original if no match
    }
    
    const centerContent = match[1].trim();
    
    // Process math in content
    let processedContent = centerContent.replace(/\$(.*?)\$/g, '\\($1\\)');
    
    // Generate the HTML centered content
    const htmlOutput = `<div class="text-center">${processedContent}</div>`;
    
    // Replace the entire center environment with the centered HTML
    return latexString.replace(/\\begin{center}[\s\S]*?\\end{center}/, htmlOutput);
  } catch (error) {
    console.error('Error converting LaTeX center to HTML:', error);
    return latexString; // Return original if error
  }
}

/**
 * Converts various LaTeX environments to HTML
 * while preserving math expressions for MathJax rendering.
 * Currently supports: enumerate, tabular, and center environments.
 * 
 * @param latexString LaTeX string containing supported environments
 * @returns HTML string with properly formatted HTML and MathJax delimiters
 */
export function convertLatexToHtml(latexString: string): string {
  if (!latexString) return '';
  
  let result = latexString;
  
  // Apply each conversion in sequence
  result = convertLatexEnumerateToHtml(result);
  result = convertLatexTabularToHtml(result);
  result = convertLatexCenterToHtml(result);
  
  return result;
}
