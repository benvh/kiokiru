/**
 * Simple default TimeFormatter used in the interal TimestampPrefixDecorator.
 *
 * This guy is really basic and its probably best to use a different one if your timestamping requires a more feature-rich output.<br/>
 * Following patterns are replaced by the formatter (similar to the unix date cmd format)<p>
 *
 * <table>
 * <tr><td>%a</td> <td>day of the week name in short form (Mon, Tue, Wed, ...)</td></tr>
 * <tr><td>%A</td> <td>day of the week name in long form (Monday, Tuesday, Wednesday, ...)</td></tr>
 * <tr><td>%b</td>   <td>month name in short form (Jan, Feb, Mar, ...)</td></tr>
 * <tr><td>%B</td>   <td>month name in long form (January, February, ...)</td></tr>
 * <tr><td>%Y</td>   <td>full year e.g. 2018, 2019, ...</td></li>
 * <tr><td>%m</td>   <td>month of the year (zero padded) (01, 02, 03, ... 12)</td></tr>
 * <tr><td>%_m</td>  <td>month of the year (not padded) (1, 2, 3, ... 12)</td></tr>
 * <tr><td>%d</td>   <td>day of the month (zero padded)</td></tr>
 * <tr><td>%_d</td>  <td>day of the month (not padded)</td></tr>
 * <tr><td>%H</td>   <td>hour of the day (24-hour zero padded)</td></tr>
 * <tr><td>%_H</td>  <td>hour of the day (24-hour not padded)</td></tr>
 * <tr><td>%I</td>   <td>hour of the day (12-hour zero padded)</td></tr>
 * <tr><td>%_I</td>  <td>hour of the day (12-hour not padded)</td></tr>
 * <tr><td>%M</td>   <td>minute of the current hour (zero padded)</td></tr>
 * <tr><td>%_M</td>  <td>minute of the current hour (not padded)</td></tr>
 * <tr><td>%S</td>   <td>second of the current minute (zero padded)</td></tr>
 * <tr><td>%_S</td>  <td>second of the current minute (not padded)</td></tr>
 * </table>
 *
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
