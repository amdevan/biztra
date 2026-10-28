<?php
/**
 * Lightweight Markdown-to-HTML renderer
 */

function renderMarkdown(string $markdown): string {
    $text = htmlspecialchars($markdown, ENT_QUOTES, 'UTF-8');

    // Horizontal rules
    $text = preg_replace('/^---$/m', '<hr class="my-8 border-border">', $text);

    // Headings
    $text = preg_replace('/^### (.+)$/m', '<h3 class="text-xl font-serif font-semibold mt-8 mb-4 text-navy-deep">$1</h3>', $text);
    $text = preg_replace('/^## (.+)$/m', '<h2 class="text-2xl font-serif font-semibold mt-10 mb-5 text-navy-deep">$1</h2>', $text);

    // Bold
    $text = preg_replace('/\*\*(.+?)\*\*/', '<strong class="font-semibold">$1</strong>', $text);

    // Italic
    $text = preg_replace('/\*(.+?)\*/', '<em>$1</em>', $text);

    // Inline code
    $text = preg_replace('/`(.+?)`/', '<code class="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">$1</code>', $text);

    // Blockquotes
    $text = preg_replace('/^&gt; (.+)$/m', '<blockquote class="border-l-4 border-gold pl-4 py-2 my-4 italic text-muted-foreground bg-muted/30 rounded-r-lg">$1</blockquote>', $text);

    // Bullet lists
    $lines = explode("\n", $text);
    $result = [];
    $inList = false;

    foreach ($lines as $line) {
        if (preg_match('/^- (.+)$/', $line, $m)) {
            if (!$inList) {
                $result[] = '<ul class="list-disc list-inside space-y-2 my-4">';
                $inList = true;
            }
            $result[] = '<li>' . $m[1] . '</li>';
        } else {
            if ($inList) {
                $result[] = '</ul>';
                $inList = false;
            }
            $result[] = $line;
        }
    }
    if ($inList) {
        $result[] = '</ul>';
    }

    $text = implode("\n", $result);

    // Paragraphs: wrap non-empty lines that aren't already wrapped in HTML tags
    $text = preg_replace('/^(?!<)(.+)$/m', '<p class="my-3 leading-relaxed">$1</p>', $text);
    // Remove empty paragraphs
    $text = preg_replace('/<p class="my-3 leading-relaxed"><\/p>/', '', $text);

    return $text;
}
