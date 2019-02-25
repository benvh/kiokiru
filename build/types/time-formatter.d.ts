/**
 * Simple default TimeFormatter used in the interal TimestampPrefixDecorator
 */
export declare class TimeFormatter {
    private fmt;
    private static readonly MONTHS;
    private static readonly MONTHS_SHORT;
    private static readonly DAYS;
    private static readonly DAYS_SHORT;
    constructor(fmt: string);
    format(date: Date): string;
    private formatShortWeekday;
    private formatLongWeekday;
    private formatShortMonth;
    private formatLongMonth;
    private formatFullYear;
    private formatMonth;
    private formatDayOfMonth;
    private formatHour24;
    private formatHour12;
    private formatMinute;
    private formatSecond;
    static format(date: Date, fmt: string): string;
}
