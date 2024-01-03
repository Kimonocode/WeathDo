import { capitalize, truncate } from "../strings";

/**
 * format days inline
 * @param day string
 * @param dayIndex number
 * @param daysArray array of days 
 * @param separator separator. default "◦"
 * @returns string
 */
function formatDaysInline(day: string, dayIndex: number, daysArray: string[], separator?: string): string {
  const lastIndex = daysArray.length - 1;
  separator = separator !== undefined ? separator : ' ◦ ';
  return `${capitalize(truncate(day, 3))}${dayIndex === lastIndex ? '' : separator}`;
}

export { formatDaysInline };