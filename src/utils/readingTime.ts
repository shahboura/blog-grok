/**
 * Calculate estimated reading time for text content
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 words/minute)
 * @returns Object with reading time in minutes and word count
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): { minutes: number; words: number } {
  // Remove markdown formatting and count words
  const cleanText = text
    .replace(/[#*_`~\[\]()]/g, '') // Remove markdown syntax
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  const words = cleanText.split(' ').filter(word => word.length > 0).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return { minutes, words };
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return '< 1 min read';
  }
  return `${minutes} min read`;
}