/**
 * Lightweight Markdown-to-HTML renderer.
 * Supports: ## / ### headings, **bold**, *italic*, - bullet lists, > blockquotes,
 * paragraphs, and line breaks. No HTML injection (escapes user content first).
 *
 * For a more feature-complete renderer, use react-markdown (already installed).
 * This utility exists for the article detail page where SSR is preferred.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInline(text: string): string {
  let out = escapeHtml(text);
  // Bold: **text**
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic: *text* or _text_
  out = out.replace(/(?<!\w)\*(.+?)\*(?!\w)/g, "<em>$1</em>");
  out = out.replace(/(?<!\w)_(.+?)_(?!\w)/g, "<em>$1</em>");
  // Inline code: `code`
  out = out.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-mist text-navy-deep font-mono text-[0.875em]" style="background: oklch(0.97 0.005 250)">$1</code>'
  );
  return out;
}

export function renderMarkdown(markdown: string): string {
  if (!markdown) return "";
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let inList = false;
  let inParagraph: string[] = [];

  const flushParagraph = () => {
    if (inParagraph.length > 0) {
      const text = inParagraph.join(" ").trim();
      if (text) {
        html.push(`<p>${renderInline(text)}</p>`);
      }
      inParagraph = [];
    }
  };

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      // Empty line — flush paragraph and close list
      flushParagraph();
      closeList();
      continue;
    }

    // H2 / H3 headings
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      flushParagraph();
      closeList();
      html.push(
        `<h2 class="font-serif text-2xl sm:text-3xl font-semibold text-navy-deep mt-10 mb-4 tracking-executive">${renderInline(h2[1])}</h2>`
      );
      continue;
    }
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flushParagraph();
      closeList();
      html.push(
        `<h3 class="font-serif text-xl sm:text-2xl font-semibold text-navy-deep mt-8 mb-3">${renderInline(h3[1])}</h3>`
      );
      continue;
    }

    // Bullet list items
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (!inList) {
        html.push(
          '<ul class="my-4 space-y-2 pl-5 list-disc text-muted-foreground">'
        );
        inList = true;
      }
      html.push(`<li>${renderInline(bullet[1])}</li>`);
      continue;
    }

    // Blockquote
    const quote = line.match(/^>\s*(.*)$/);
    if (quote) {
      flushParagraph();
      closeList();
      html.push(
        `<blockquote class="my-6 border-l-2 border-gold pl-5 py-1 italic text-navy-deep font-serif text-lg">${renderInline(quote[1] || "")}</blockquote>`
      );
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line)) {
      flushParagraph();
      closeList();
      html.push('<hr class="my-8 border-border" />');
      continue;
    }

    // Regular text — accumulate into paragraph
    inParagraph.push(line.trim());
  }

  flushParagraph();
  closeList();

  return html.join("\n");
}
