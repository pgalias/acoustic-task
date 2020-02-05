export function truncate(text: string, limit: number): string {
  if (!text) {
    return '';
  }

  if (text.length <= limit) {
    return text.trim();
  }

  const truncated = text.replace(
    new RegExp('^(.{' + limit + '}[^\\s]*).*', 's'),
    '$1',
  );

  return (
    truncated + (truncated.trim().length === text.trim().length ? '' : '...')
  );
}
