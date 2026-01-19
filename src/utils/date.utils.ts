import { BS_DATA, NEPALI_NUMERALS } from "../constants";
import type { ConvertedDate } from "../types";

export const toNepaliNum = (num: number): string => {
  return num
    .toString()
    .split("")
    .map((d) => NEPALI_NUMERALS[parseInt(d)])
    .join("");
};

export const getDaysInBSMonth = (year: number, month: number): number => {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString().padStart(2, "0");

  if (!BS_DATA[yearStr] || !BS_DATA[yearStr][monthStr]) return 30;

  const start = new Date(BS_DATA[yearStr][monthStr].startDate);
  const end = new Date(BS_DATA[yearStr][monthStr].endDate);
  return (
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
};

export const getDaysInADMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const bsToAd = (
  bsYear: number,
  bsMonth: number,
  bsDay: number,
): ConvertedDate | null => {
  const yearStr = bsYear.toString();
  const monthStr = (bsMonth + 1).toString().padStart(2, "0");

  if (!BS_DATA[yearStr] || !BS_DATA[yearStr][monthStr]) return null;

  const startDate = new Date(BS_DATA[yearStr][monthStr].startDate);
  const result = new Date(startDate);
  result.setDate(result.getDate() + bsDay - 1);

  return {
    year: result.getFullYear(),
    month: result.getMonth(),
    day: result.getDate(),
  };
};

export const adToBs = (
  adYear: number,
  adMonth: number,
  adDay: number,
): ConvertedDate | null => {
  const targetDate = new Date(adYear, adMonth, adDay);

  for (const [year, months] of Object.entries(BS_DATA)) {
    for (const [month, range] of Object.entries(months)) {
      const start = new Date(range.startDate);
      const end = new Date(range.endDate);

      if (targetDate >= start && targetDate <= end) {
        const dayDiff =
          Math.round(
            (targetDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
          ) + 1;
        return {
          year: parseInt(year),
          month: parseInt(month) - 1,
          day: dayDiff,
        };
      }
    }
  }
  return null;
};
