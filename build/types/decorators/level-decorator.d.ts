import { ILogEvent, LogLevel, ILogEventPredicate } from "../ilogger";
import { LogEventDecorator } from "../log-event-decorator";
/**
 * Overrides the ILogEvent's LogLevel
 */
export declare class LevelOverrideDecorator extends LogEventDecorator {
    private levelOverride;
    constructor(event: ILogEvent, level: LogLevel);
    level(): LogLevel;
}
/**
 * Conditionally overrides the ILogEvent's LogLevel
 */
export declare class ConditionalLevelDecorator extends LogEventDecorator {
    private levelOverride;
    private overridePredicate;
    constructor(event: ILogEvent, level: LogLevel, predicate: ILogEventPredicate);
    level(): LogLevel;
}
