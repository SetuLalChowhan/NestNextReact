/**
 * Converts text into an SEO-friendly URL slug
 * Example: "My Project Name 2026" -> "my-project-name-2026"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function withSlugSuffix(base: string, attempt: number, maxLength = 80): string {
  if (attempt <= 1) return base;
  const suffix = `-${attempt}`;
  const room = maxLength - suffix.length;
  return `${base.slice(0, room).replace(/-+$/, '')}${suffix}`;
}

export function firstFreeSlug(
  base: string,
  taken: Iterable<string>,
  maxAttempts = 50,
): string {
  const used = new Set(taken);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const candidate = withSlugSuffix(base, attempt);
    if (!used.has(candidate)) return candidate;
  }

  return withSlugSuffix(base, maxAttempts + 1);
}
