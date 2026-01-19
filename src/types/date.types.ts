export type CalendarType = "BS" | "AD";

export type Theme = "blue" | "green" | "purple" | "red";

export interface DateObject {
  year: number;
  month: number;
  day: number;
  calendarType: CalendarType;
}

export interface BSMonthData {
  startDate: string;
  endDate: string;
}

export interface BSYearData {
  [month: string]: BSMonthData;
}

export interface BSData {
  [year: string]: BSYearData;
}

export interface ConvertedDate {
  year: number;
  month: number;
  day: number;
}
