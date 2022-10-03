import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export function tsToAgo(timestamp: string): string {
  const ts = parseInt(timestamp);
  if (!ts) {
    return "";
  }

  return timeAgo.format(ts);
}
