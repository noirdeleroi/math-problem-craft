// latexConverter.ts

export function convertLatexTextToHtml(tex: string): string {
  const mathBlocks: string[] = [];

  tex = tex.replace(/\$(.+?)\$/g, '\\($1\\)');
  tex = tex.replace(/\$\$(.+?)\$\$/gs, '\\[$1\\]');

  const mathReplacer = (match: string): string => {
    mathBlocks.push(match);
    return `__MATH_BLOCK_${mathBlocks.length - 1}__`;
  };

  tex = tex.replace(/\\\[(.*?)\\\]/gs, mathReplacer);
  tex = tex.replace(/\\\((.*?)\\\)/gs, mathReplacer);

  tex = tex.replace(/\\begin{align\*}(.*?)\\end{align\*}/gs, (_, content) => 
    `\\[\\begin{align*}${content.trim()}\\end{align*}\\]`
  );

  tex = tex.replace(/\\text{([^}]*)}/g, '$1');
  tex = tex.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  tex = tex.replace(/\\vspace{([\-0-9.]+)cm}/g, (_, size) =>
    parseFloat(size) >= 0.2 ? `<div style="margin-top:${size}cm;"></div>` : ''
  );
  tex = tex.replace(/\\section\*{(.+?)}/g, '<h2>$1</h2>');
  tex = tex.replace(/\\subsection\*{(.+?)}/g, '<h3 class="subsection-title">$1</h3>');
  tex = tex.replace(/\\paragraph{(.+?)}/g, '<p><strong>$1</strong></p>');
  tex = tex.replace(/\\textbf{(.+?)}/g, '<strong>$1</strong>');

  tex = tex.replace(/\\begin{itemize}/g, '<ul>');
  tex = tex.replace(/\\end{itemize}/g, '</ul>');
  tex = tex.replace(/\\item/g, '<li>');
  tex = tex.replace(/\n\n/g, '\n␤\n'); // placeholder for paragraph split

  tex = tex.replace(/\\captionof{figure}{(.+?)}/g,
    '<figcaption style="text-align: center; font-style: italic; margin-top: 8px;">$1</figcaption>'
  );

  tex = tex.replace(/\\includegraphics\[width=([0-9.]+)\\textwidth]{(.+?)}/g, (_, width, file) =>
    `<div style="text-align:center;"><img src="../../assets/images/${file}" style="width:${parseFloat(width) * 100}%"></div>`
  );

  // Convert preserved math blocks back
  mathBlocks.forEach((block, i) => {
    tex = tex.replace(`__MATH_BLOCK_${i}__`, block);
  });

  // Now wrap paragraphs safely
  tex = tex
    .split('\n␤\n')
    .map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      if (/^<.*>.*<\/.*>$/.test(trimmed)) return trimmed; // already HTML
      if (/^\d+$/.test(trimmed)) return trimmed; // single number
      return `<p>${trimmed}</p>`;
    })
    .join('\n\n');

  return tex;
}
