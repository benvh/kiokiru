import { ILogEvent, ILogEventData, LogLevel } from './ilogger';
/**
 * Base decorator class for ILogEvent decoration.
 *
 * It provides overridable default implementations for all ILogEvent methods.
 * The default implementation simply returns the value of original ILogEvent that needed decorating (the one that's provided in the constructor)
 */
export declare abstract class LogEventDecorator implements ILogEvent {
    protected event: ILogEvent;
    constructor(event: ILogEvent);
    timestamp(): number;
    message(): string;
    level(): LogLevel;
    data(): ILogEventData;
}
