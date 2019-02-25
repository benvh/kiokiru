import { ILogEvent, ILogEventData, LogLevel } from './ilogger';
export declare abstract class LogEventDecorator implements ILogEvent {
    protected event: ILogEvent;
    constructor(event: ILogEvent);
    timestamp(): number;
    message(): string;
    level(): LogLevel;
    data(): ILogEventData;
}
