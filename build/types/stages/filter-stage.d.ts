import { ILogEvent, LogLevel, ILogEventPredicate } from '../ilogger';
import { IPipelineStage } from "../logger-pipeline";
/**
 * Filters out ILogEvents from the pipeline
 */
export declare abstract class FilterStage implements IPipelineStage {
    process(logEvent: ILogEvent): Promise<ILogEvent>;
    abstract filter(event: ILogEvent): boolean;
}
/**
 * Filters out ILogEvents that  do not match the configured predicate.
 */
export declare class PredicateFilterStage extends FilterStage {
    private predicate;
    constructor(predicate: ILogEventPredicate);
    filter(event: ILogEvent): boolean;
}
/**
 * Filters out ILogEvents with a LogLevel lower than its configured level
 * e.g. when minLogLevel is configured to ERROR messages with level DEBUG, INFO and WARN are filtered out and only ERROR and FATAL are passed along
 */
export declare class LogLevelFilterStage extends FilterStage {
    private minLogLevel;
    constructor(minimumLogLevel: LogLevel);
    filter(event: ILogEvent): boolean;
}
