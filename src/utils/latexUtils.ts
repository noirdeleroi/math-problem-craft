/**
 * Converts LaTeX enumerate environments to HTML ordered lists
 * while preserving math expressions for MathJax rendering.
 * 
 * @param latexString LaTeX string containing \begin{enumerate} environment
 * @returns HTML string with properly formatted ordered list and MathJax delimiters
 */
export function convertLatexEnumerateToHtml(latexString: string): string {
  if (!latexString) return '';
  
  // Use RegExp with global flag to match all instances
  const regex = /\\begin{enumerate}([\s\S]*?)\\end{enumerate}/g;
  let result = latexString;
  let match;
  
  while ((match = regex.exec(latexString)) !== null) {
    const fullMatch = match[0];
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
    
    // Replace the current enumerate environment with the HTML list
    result = result.replace(fullMatch, htmlOutput);
  }
  
  return result;
}

/**
 * Converts LaTeX itemize environments to HTML unordered lists
 * while preserving math expressions for MathJax rendering.
 * 
 * @param latexString LaTeX string containing \begin{itemize} environment
 * @returns HTML string with properly formatted unordered list and MathJax delimiters
 */
export function convertLatexItemizeToHtml(latexString: string): string {
  if (!latexString) return '';
  
  // Use RegExp with global flag to match all instances
  const regex = /\\begin{itemize}([\s\S]*?)\\end{itemize}/g;
  let result = latexString;
  let match;
  
  while ((match = regex.exec(latexString)) !== null) {
    const fullMatch = match[0];
    const itemsContent = match[1];
    
    // Split by \item and remove empty entries
    const items = itemsContent
      .split('\\item')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Generate the HTML list
    let htmlOutput = '<ul>';
    
    items.forEach(item => {
      // Convert $...$ to \(...\) for MathJax inline math
      let processedItem = item;
      processedItem = processedItem.replace(/\$(.*?)\$/g, '\\($1\\)');
      
      htmlOutput += `\n  <li>${processedItem}</li>`;
    });
    
    htmlOutput += '\n</ul>';
    
    // Replace the current itemize environment with the HTML list
    result = result.replace(fullMatch, htmlOutput);
  }
  
  return result;
}

/**
 * Converts LaTeX tabular environments to HTML tables
 * while preserving math expressions for MathJax rendering.
 * Improved handling of \hline by removing it before parsing rows.
 * 
 * @param latexString LaTeX string containing \begin{tabular} environment
 * @returns HTML string with properly formatted table and MathJax delimiters
 */
export function convertLatexTabularToHtml(latexString: string): string {
  if (!latexString) return '';
  
  // Use RegExp with global flag to match all instances
  const regex = /\\begin{tabular}{([^}]*)}\s*([\s\S]*?)\\end{tabular}/g;
  let result = latexString;
  let match;
  
  while ((match = regex.exec(latexString)) !== null) {
    const fullMatch = match[0];
    const columnFormat = match[1]; // Not used but available for future enhancements
    let tableContent = match[2];
    
    // Process \hline markers before splitting rows
    const hasHeaderRow = tableContent.includes('\\hline');
    
    // Count \hline occurrences to determine row styling
    const hlinePositions: number[] = [];
    let tempContent = tableContent;
    let hlineIndex = tempContent.indexOf('\\hline');
    let rowIndex = 0;
    
    while (hlineIndex !== -1) {
      // Count newlines before this \hline to determine row position
      const contentBeforeHline = tempContent.substring(0, hlineIndex);
      const newlineCount = (contentBeforeHline.match(/\n/g) || []).length;
      hlinePositions.push(newlineCount);
      
      // Remove this \hline and continue searching
      tempContent = tempContent.substring(hlineIndex + 6);
      hlineIndex = tempContent.indexOf('\\hline');
    }
    
    // Remove all \hline before further processing
    tableContent = tableContent.replace(/\\hline/g, '');
    
    // Split by \\ to get rows
    const rows = tableContent.split('\\\\').map(row => row.trim()).filter(row => row.length > 0);
    
    // Generate the HTML table
    let htmlOutput = '<table class="border-collapse border border-gray-300">';
    
    rows.forEach((row, rowIndex) => {
      const isHeader = hlinePositions.includes(rowIndex) && hlinePositions.includes(rowIndex + 1);
      const hasTopBorder = hlinePositions.includes(rowIndex);
      const hasBottomBorder = hlinePositions.includes(rowIndex + 1);
      
      const rowTag = isHeader ? 'th' : 'td';
      const rowClass = `class="${hasTopBorder ? 'border-t-2 ' : ''}${hasBottomBorder ? 'border-b-2 ' : ''}border-gray-300"`;
      
      htmlOutput += `\n  <tr ${rowClass}>`;
      
      // Split by & to get cells
      const cells = row.split('&').map(cell => cell.trim());
      
      cells.forEach(cell => {
        // Convert $...$ to \(...\) for MathJax inline math
        let processedCell = cell;
        processedCell = processedCell.replace(/\$(.*?)\$/g, '\\($1\\)');
        
        htmlOutput += `\n    <${rowTag} class="border border-gray-300 px-2 py-1">${processedCell}</${rowTag}>`;
      });
      
      htmlOutput += '\n  </tr>';
    });
    
    htmlOutput += '\n</table>';
    
    // Replace the current tabular environment with the HTML table
    result = result.replace(fullMatch, htmlOutput);
  }
  
  return result;
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
  
  // Use RegExp with global flag to match all instances
  const regex = /\\begin{center}([\s\S]*?)\\end{center}/g;
  let result = latexString;
  let match;
  
  while ((match = regex.exec(latexString)) !== null) {
    const fullMatch = match[0];
    const centerContent = match[1].trim();
    
    // Process math in content
    let processedContent = centerContent.replace(/\$(.*?)\$/g, '\\($1\\)');
    
    // Generate the HTML centered content
    const htmlOutput = `<div class="text-center">${processedContent}</div>`;
    
    // Replace the current center environment with the centered HTML
    result = result.replace(fullMatch, htmlOutput);
  }
  
  return result;
}

/**
 * Converts LaTeX display math environments (equation and \[...\]) to HTML
 * while preserving math expressions for MathJax rendering.
 * 
 * @param latexString LaTeX string containing display math
 * @returns HTML string with properly formatted display math
 */
export function convertLatexDisplayMathToHtml(latexString: string): string {
  if (!latexString) return '';
  
  let result = latexString;
  
  // Convert \begin{equation}...\end{equation} to display math
  const equationRegex = /\\begin{equation}([\s\S]*?)\\end{equation}/g;
  let equationMatch;
  
  while ((equationMatch = equationRegex.exec(latexString)) !== null) {
    const fullMatch = equationMatch[0];
    const equationContent = equationMatch[1].trim();
    
    // Wrap in display math div, keeping the raw equation for MathJax
    const htmlOutput = `<div class="math-display">\\[${equationContent}\\]</div>`;
    
    // Replace the current equation with the display math HTML
    result = result.replace(fullMatch, htmlOutput);
  }
  
  // Convert \[...\] to display math (if not already processed)
  // Using a non-greedy match for the content between \[ and \]
  const displayMathRegex = /\\\[([\s\S]*?)\\\]/g;
  let displayMathMatch;
  
  while ((displayMathMatch = displayMathRegex.exec(latexString)) !== null) {
    const fullMatch = displayMathMatch[0];
    
    // Wrap in display math div, keeping the raw display math for MathJax
    const htmlOutput = `<div class="math-display">${fullMatch}</div>`;
    
    // Replace the current display math with the HTML wrapped version
    result = result.replace(fullMatch, htmlOutput);
  }
  
  return result;
}

/**
 * Converts various LaTeX environments to HTML
 * while preserving math expressions for MathJax rendering.
 * Supports: enumerate, itemize, tabular, center, equation, and display math environments.
 * 
 * @param latexString LaTeX string containing supported environments
 * @returns HTML string with properly formatted HTML and MathJax delimiters
 */
export function convertLatexToHtml(latexString: string): string {
  if (!latexString) return '';
  
  let result = latexString;
  
  // Apply each conversion in sequence
  result = convertLatexEnumerateToHtml(result);
  result = convertLatexItemizeToHtml(result);
  result = convertLatexTabularToHtml(result);
  result = convertLatexCenterToHtml(result);
  result = convertLatexDisplayMathToHtml(result);
  
  return result;
}
