'use strict';

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
export class TimeFormatter {

    private fmt: string;

    private static readonly MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octorber', 'November', 'December'];
    private static readonly MONTHS_SHORT = TimeFormatter.MONTHS.map(month => month.substr(0, 3));

    private static readonly DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursay', 'Friday', 'Saturday'];
    private static readonly DAYS_SHORT = TimeFormatter.DAYS.map(day => day.substr(0, 3));

    constructor(fmt: string) {
        this.fmt = fmt;
    }

    format(date: Date): string {
        let outputString = this.fmt;
        // month names short/long
        outputString = outputString.replace('%b', this.formatShortMonth(date));
        outputString = outputString.replace('%B', this.formatLongMonth(date));

        // day of week names short/long
        outputString = outputString.replace('%a', this.formatShortWeekday(date));
        outputString = outputString.replace('%A', this.formatLongWeekday(date));

        // full year
        outputString = outputString.replace('%Y', this.formatFullYear(date));

        // month 01..12 only zero/non-zero padded
        outputString = outputString.replace('%m', this.formatMonth(date));
        outputString = outputString.replace('%_m', this.formatMonth(date, false));

        // day of month 1..28/30/31 zero/non-zero padded
        outputString = outputString.replace('%d',  this.formatDayOfMonth(date));
        outputString = outputString.replace('%_d',  this.formatDayOfMonth(date, false));

        // hours zero/non-zero padded
        outputString = outputString.replace('%H', this.formatHour24(date));
        outputString = outputString.replace('%_H', this.formatHour24(date, false));
        outputString = outputString.replace('%I', this.formatHour12(date));
        outputString = outputString.replace('%_I', this.formatHour12(date, false));

        // minutes zero/non-zero padded
        outputString = outputString.replace('%M', this.formatMinute(date));
        outputString = outputString.replace('%_M', this.formatMinute(date, false));

        // seconds zero/non-zero padded
        outputString = outputString.replace('%S', this.formatSecond(date));
        outputString = outputString.replace('%_S', this.formatSecond(date, false));

        return outputString;
    }

    private formatShortWeekday(date: Date): string {
        return TimeFormatter.DAYS_SHORT[date.getDay()];
    }

    private formatLongWeekday(date: Date): string {
        return TimeFormatter.DAYS[date.getDay()];
    }

    private formatShortMonth(date: Date): string {
        return TimeFormatter.MONTHS_SHORT[date.getMonth()];
    }

    private formatLongMonth(date: Date): string {
        return TimeFormatter.MONTHS[date.getMonth()];
    }

    private formatFullYear(date: Date): string {
        return `${date.getFullYear()}`;
    }

    private formatMonth(date: Date, zeroPad: boolean = true): string {
        let month = date.getMonth() + 1;
        return (zeroPad && month < 10) ? `0${month}` : `${month}`;
    }

    private formatDayOfMonth(date: Date, zeroPad: boolean = true): string {
        let dayOfMonth = date.getDate();
        return (zeroPad && dayOfMonth < 10) ? `0${dayOfMonth}` : `${dayOfMonth}`;
    }

    private formatHour24(date: Date, zeroPad: boolean = true): string {
        let hour = date.getHours();
        return (zeroPad && hour < 10) ? `0${hour}` : `${hour}`;
    }

    private formatHour12(date: Date, zeroPad: boolean = true): string {
        let hour = Math.floor(date.getHours() / 12);
        return (zeroPad && hour < 10) ? `0${hour}` : `${hour}`;
    }

    private formatMinute(date: Date, zeroPad: boolean = true): string {
        let minute = date.getMinutes();
        return (zeroPad && minute < 10) ? `0${minute}` : `${minute}`;
    }

    private formatSecond(date: Date, zeroPad: boolean = true): string {
        let second = date.getSeconds(); 
        return (zeroPad && second < 10) ? `0${second}` : `${second}`;
    }

    static format(date: Date, fmt: string): string {
        const formatter = new TimeFormatter(fmt);
        return formatter.format(date);
    }

}
