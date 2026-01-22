import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type JSX } from "react";
import { AD_MONTHS, BS_MONTHS } from "./constants";
import type { CalendarType, ConvertedDate, DateObject, Theme } from "./types";
import {
  adToBs,
  bsToAd,
  getDaysInADMonth,
  getDaysInBSMonth,
  toNepaliNum,
} from "./utils";

interface DatePickerProps {
  value?: DateObject | null;
  onChange?: (date: DateObject | null) => void;
  calendarType?: CalendarType;
  placeholder?: string;
  useNepaliNumerals?: boolean;
  theme?: Theme;
  disabled?: boolean;
  minDate?: DateObject | null;
  maxDate?: DateObject | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const DatePicker: React.FC<DatePickerProps> = ({
  value = null,
  onChange = () => {},
  calendarType = "BS",
  placeholder = "Select date",
  useNepaliNumerals = true,
  theme = "blue",
  disabled = false,
  className = "",
  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(value);
  const [currentCalendarType, setCurrentCalendarType] =
    useState<CalendarType>(calendarType);
  const [viewYear, setViewYear] = useState<number | null>(null);
  const [viewMonth, setViewMonth] = useState<number | null>(null);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeColors: Record<Theme, string> = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
  };

  const themeAccents: Record<Theme, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };

  const sizeConfig = {
    sm: {
      input: "px-3 py-1.5 text-xs",
      icon: "w-4 h-4",
      calendarWidth: "w-72",
      cellHeight: "h-8",
      fontSize: "text-xs",
    },
    md: {
      input: "px-4 py-2.5 text-sm",
      icon: "w-5 h-5",
      calendarWidth: "w-80",
      cellHeight: "h-10",
      fontSize: "text-sm",
    },
    lg: {
      input: "px-5 py-3 text-base",
      icon: "w-6 h-6",
      calendarWidth: "w-96",
      cellHeight: "h-12",
      fontSize: "text-base",
    },
  };

  useEffect(() => {
    const today = new Date();
    if (selectedDate) {
      if (currentCalendarType === "BS") {
        setViewYear(selectedDate.year);
        setViewMonth(selectedDate.month);
      } else {
        setViewYear(selectedDate.year);
        setViewMonth(selectedDate.month);
      }
    } else {
      if (currentCalendarType === "BS") {
        const bsToday = adToBs(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
        if (bsToday) {
          setViewYear(bsToday.year);
          setViewMonth(bsToday.month);
        }
      } else {
        setViewYear(today.getFullYear());
        setViewMonth(today.getMonth());
      }
    }
  }, [currentCalendarType, selectedDate]);

  useLayoutEffect(() => {
    if (isOpen && containerRef.current && dropdownRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const dropdownHeight = dropdownRect.height;

      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }
  }, [isOpen]);

  const formatDate = (date: DateObject, type: CalendarType): string => {
    if (!date) return "";

    const monthNames = type === "BS" ? BS_MONTHS : AD_MONTHS;
    const year =
      useNepaliNumerals && type === "BS" ? toNepaliNum(date.year) : date.year;
    const day =
      useNepaliNumerals && type === "BS" ? toNepaliNum(date.day) : date.day;

    return `${monthNames[date.month]} ${day}, ${year}`;
  };

  const handleDateSelect = (day: number): void => {
    const newDate: DateObject = {
      year: viewYear!,
      month: viewMonth!,
      day: day,
      calendarType: currentCalendarType,
    };

    setSelectedDate(newDate);
    onChange(newDate);
    setIsOpen(false);
  };

  const handleMonthChange = (direction: number): void => {
    let newMonth = viewMonth! + direction;
    let newYear = viewYear!;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setViewMonth(newMonth);
    setViewYear(newYear);
  };

  const handleCalendarTypeToggle = (): void => {
    const newType: CalendarType = currentCalendarType === "BS" ? "AD" : "BS";
    setCurrentCalendarType(newType);

    // Convert and update the selected date
    if (selectedDate) {
      let convertedDate: ConvertedDate | null;
      if (newType === "AD") {
        convertedDate = bsToAd(
          selectedDate.year,
          selectedDate.month,
          selectedDate.day,
        );
      } else {
        convertedDate = adToBs(
          selectedDate.year,
          selectedDate.month,
          selectedDate.day,
        );
      }

      if (convertedDate) {
        const newSelectedDate: DateObject = {
          year: convertedDate.year,
          month: convertedDate.month,
          day: convertedDate.day,
          calendarType: newType,
        };
        setSelectedDate(newSelectedDate);
        setViewYear(convertedDate.year);
        setViewMonth(convertedDate.month);
      }
    } else {
      // If no date selected, just update the view to today in the new calendar type
      const today = new Date();
      if (newType === "BS") {
        const bsToday = adToBs(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );
        if (bsToday) {
          setViewYear(bsToday.year);
          setViewMonth(bsToday.month);
        }
      } else {
        setViewYear(today.getFullYear());
        setViewMonth(today.getMonth());
      }
    }
  };

  const handleTodayClick = (): void => {
    const today = new Date();

    if (currentCalendarType === "BS") {
      const bsToday = adToBs(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      if (bsToday) {
        setViewYear(bsToday.year);
        setViewMonth(bsToday.month);
      }
    } else {
      setViewYear(today.getFullYear());
      setViewMonth(today.getMonth());
    }
  };

  const isTodayDate = (year: number, month: number, day: number): boolean => {
    const today = new Date();

    if (currentCalendarType === "BS") {
      const bsToday = adToBs(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );
      if (!bsToday) return false;
      return (
        bsToday.year === year && bsToday.month === month && bsToday.day === day
      );
    } else {
      return (
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day
      );
    }
  };

  const renderCalendar = (): JSX.Element => {
    const daysInMonth =
      currentCalendarType === "BS"
        ? getDaysInBSMonth(viewYear!, viewMonth!)
        : getDaysInADMonth(viewYear!, viewMonth!);

    let firstDay: number;
    if (currentCalendarType === "BS") {
      // Get the AD date for the first day of this BS month
      const firstBSDate = bsToAd(viewYear!, viewMonth!, 1);
      if (firstBSDate) {
        firstDay = new Date(
          firstBSDate.year,
          firstBSDate.month,
          firstBSDate.day,
        ).getDay();
      } else {
        firstDay = 0;
      }
    } else {
      firstDay = new Date(viewYear!, viewMonth!, 1).getDay();
    }

    const days: JSX.Element[] = [];
    const weekDays =
      currentCalendarType === "BS"
        ? ["आ", "सो", "मं", "बु", "बि", "शु", "श"]
        : ["S", "M", "T", "W", "T", "F", "S"];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className={sizeConfig[size].cellHeight}></div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.year === viewYear &&
        selectedDate.month === viewMonth &&
        selectedDate.day === day &&
        selectedDate.calendarType === currentCalendarType;

      const isToday = isTodayDate(viewYear!, viewMonth!, day);

      const displayDay =
        useNepaliNumerals && currentCalendarType === "BS"
          ? toNepaliNum(day)
          : day;

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={disabled}
          className={`${sizeConfig[size].cellHeight} flex items-center justify-center rounded-lg ${sizeConfig[size].fontSize} font-medium transition-colors relative
            ${
              isSelected
                ? themeColors[theme]
                : isToday
                  ? `${themeAccents[theme]} border`
                  : "hover:bg-gray-100 text-gray-700"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {displayDay}
          {isToday && !isSelected && (
            <div
              className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${themeColors[theme].split(" ")[0]}`}
            />
          )}
        </button>,
      );
    }

    return (
      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, i) => (
            <div
              key={i}
              className={`${sizeConfig[size].cellHeight} flex items-center justify-center text-xs font-semibold text-gray-600`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  if (viewYear === null || viewMonth === null) return null;

  const monthNames = currentCalendarType === "BS" ? BS_MONTHS : AD_MONTHS;
  const displayYear =
    useNepaliNumerals && currentCalendarType === "BS"
      ? toNepaliNum(viewYear)
      : viewYear;

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${sizeConfig[size].input} border rounded-lg cursor-pointer transition-colors
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:border-gray-400"
          }
          ${isOpen ? "border-gray-400 ring-2 ring-gray-200" : "border-gray-300"}
        `}
      >
        <Calendar className={`${sizeConfig[size].icon} text-gray-500`} />
        <span
          className={`flex-1 ${selectedDate ? "text-gray-900" : "text-gray-500"} ${sizeConfig[size].fontSize}`}
        >
          {selectedDate
            ? formatDate(selectedDate, selectedDate.calendarType)
            : placeholder}
        </span>
        {selectedDate && !disabled && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDate(null);
              onChange(null);
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={dropdownRef}
            className={`absolute z-50 ${position === "top" ? "bottom-full mb-2" : "mt-2"} bg-white rounded-xl shadow-2xl border border-gray-200 ${sizeConfig[size].calendarWidth}`}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => handleMonthChange(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-center">
                  <div
                    className={`font-semibold text-gray-900 ${size === "lg" ? "text-lg" : "text-base"}`}
                  >
                    {monthNames[viewMonth]} {displayYear}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {currentCalendarType === "BS"
                      ? "Bikram Sambat"
                      : "Anno Domini"}
                  </div>
                </div>

                <button
                  onClick={() => handleMonthChange(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleTodayClick}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Today
                </button>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium transition-colors ${currentCalendarType === "AD" ? "text-gray-900" : "text-gray-400"}`}
                  >
                    AD
                  </span>
                  <button
                    onClick={handleCalendarTypeToggle}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      currentCalendarType === "BS"
                        ? themeColors[theme].split(" ")[0]
                        : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        currentCalendarType === "BS"
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-xs font-medium transition-colors ${currentCalendarType === "BS" ? "text-gray-900" : "text-gray-400"}`}
                  >
                    BS
                  </span>
                </div>
              </div>
            </div>

            {renderCalendar()}
          </div>
        </>
      )}
    </div>
  );
};

export default DatePicker;
