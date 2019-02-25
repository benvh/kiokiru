import { ILogEvent, ILogger, ILogEventData, LogLevel, ILogEventPredicate } from './ilogger';
import { IPipelineStage, LoggerPipeline } from './logger-pipeline';
import { SinkStage } from './stages/sink-stage';
import { StringProvider } from './decorators/message-decorator';
/**
 * Base ILogEvent implementation.
 */
export declare class LogEvent implements ILogEvent {
    private _timestamp;
    private _message;
    private _level;
    private _data;
    constructor(timestamp: number, message: string, level: LogLevel, data: ILogEventData);
    timestamp(): number;
    message(): string;
    level(): LogLevel;
    data(): ILogEventData;
}
/**
 * Pipeline based ILogger implementation. Every logged message passes through a pipeline of IPipelineStage stages.
 * Each stage passes the event along (or null to filter it out). IPipelineStages are allowed modify / decorate the ILogEvents
 * before returning them.
 * All Logger instances are IPipelineStages as well. Note that they will always return the original ILogEvent when they have finished processing it.
 */
export declare class Logger implements ILogger, IPipelineStage {
    private pipeline;
    constructor(pipeline: LoggerPipeline);
    process(logEvent: ILogEvent): Promise<ILogEvent>;
    debug(message: string, data?: ILogEventData): void;
    info(message: string, data?: ILogEventData): void;
    warn(message: string, data?: ILogEventData): void;
    error(message: string, data?: ILogEventData): void;
    fatal(message: string, data?: ILogEventData): void;
    /**
     * Utility method that creates an empty LoggerBuilder
     */
    static builder(): LoggerBuilder;
    /**
     * Utility method that creates a LoggerBuilder that has a pre-configured MessagePrefixStage that prefixes all messages with the provided type's name
     * @param type the type that which name needs to be prefixed
     */
    static for(type: Function): LoggerBuilder;
}
/**
 * Utility class to help build Logger instances.
 */
export declare class LoggerBuilder {
    readonly pipeline: LoggerPipeline;
    /**
     * Adds a stage to the pipeline
     * @param stage
     */
    addStage(stage: IPipelineStage): LoggerBuilder;
    /**
     * Adds a {TimestampFormatterStage} to the pipeline for the logger that's being built.
     */
    timestamp(): LoggerBuilder;
    /**
     * Adds a {MessagePrefixStage} that adds the provided prefix ({string} or {StringProvider}) to the pipeline for the logger that's being built.
     * @param prefix
     */
    prefix(prefix: string | StringProvider): LoggerBuilder;
    /**
     * Adds an {PredicateFilterStage} with the provided predicate to the pipeline for the logger that's being built.
     * @param predicate
     */
    filter(predicate: ILogEventPredicate): LoggerBuilder;
    /**
     * Adds a {SinkStage} to the pipeline for the logger that's being built.
     * @param sink
     */
    sink(sinkStage: SinkStage): LoggerBuilder;
    /**
     * Adds a {LogLevelFilterStage} to the pipeline for the logger that's being built.
     * This will filter out all ILogEvents that have a {LogLevel} lower than the provided one.
     * @param minimumLogLevel
     */
    logLevel(minimumLogLevel: LogLevel): LoggerBuilder;
    /**
     * Adds a {DataFormatterStage} which will try to replace "{...}" sequences with values from the ILogEventData dictionary
     */
    includeData(): LoggerBuilder;
    /**
     * Builds the logger with the configured pipeline
     */
    build(): Logger;
}
