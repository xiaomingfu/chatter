export function tsToAgo(timestamp: string): string {
  const ts = parseInt(timestamp);
  if (!ts) {
    return "";
  }
  const date = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffSeconds = diff / 1000;
  const diffMinutes = diffSeconds / 60;
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24;
  const diffMonths = diffDays / 30;
  const diffYears = diffMonths / 12;
  if (diffSeconds < 60) {
    return `${Math.floor(diffSeconds)} seconds ago`;
  }
  if (diffMinutes < 60) {
    return `${Math.floor(diffMinutes)} minutes ago`;
  }
  if (diffHours < 24) {
    return `${Math.floor(diffHours)} hours ago`;
  }
  if (diffDays < 30) {
    return `${Math.floor(diffDays)} days ago`;
  }
  if (diffMonths < 12) {
    return `${Math.floor(diffMonths)} months ago`;
  }
  return `${Math.floor(diffYears)} years ago`;
}
