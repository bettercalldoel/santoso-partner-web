function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function applyInlineFormatting(value: string): string {
  return value
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

export function markdownToHtml(markdown: string): string {
  const safe = escapeHtml(markdown.trim());
  const blocks = safe.split(/\n{2,}/).filter(Boolean);

  return blocks
    .map((block) => {
      const trimmed = block.trim();
      const withInline = applyInlineFormatting(trimmed);

      if (withInline.startsWith('### ')) {
        return `<h3>${withInline.slice(4)}</h3>`;
      }
      if (withInline.startsWith('## ')) {
        return `<h2>${withInline.slice(3)}</h2>`;
      }
      if (withInline.startsWith('# ')) {
        return `<h1>${withInline.slice(2)}</h1>`;
      }

      return `<p>${withInline.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();
}
