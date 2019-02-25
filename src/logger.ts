'use strict'

import { ILogEvent, ILogger, ILogEventData, LogLevel, ILogEventPredicate } from './ilogger';
import { IPipelineStage, LoggerPipeline } from './logger-pipeline';
import { SinkStage } from './stages/sink-stage';
import { StringProvider } from './decorators/message-decorator';
import { MessagePrefixStage, TimestampPrefixStage,DataInjectorStage } from './stages/message-formatter-stage';
import { PredicateFilterStage, LogLevelFilterStage } from './stages/filter-stage';
import { LogEventDecorator } from './log-event-decorator';

/**
 * Base ILogEvent implementation.
 */
export class LogEvent implements ILogEvent {

    private _timestamp: number;
    private _message: string;
    private _level: LogLevel;
    private _data: ILogEventData;

    constructor(timestamp: number, message: string, level: LogLevel, data: ILogEventData) {
        this._timestamp = timestamp;
        this._message = message;
        this._level = level;
        this._data = data;
    }

    timestamp(): number {
        return this._timestamp;
    }  
    
    message(): string {
        return this._message;
    }

    level(): LogLevel {
        return this._level;
    }

    data(): ILogEventData {
        return this._data;
    }
}

/**
 * Pipeline based ILogger implementation. Every logged message passes through a pipeline of IPipelineStage stages.
 * Each stage passes the event along (or null to filter it out). IPipelineStages are allowed modify / decorate the ILogEvents
 * before returning them.
 * 
 * All Logger instances are IPipelineStages as well. Note that they will always return the original ILogEvent when they have finished processing it.
 */
export class Logger implements ILogger, IPipelineStage {

    private pipeline: LoggerPipeline;

    constructor(pipeline: LoggerPipeline) {
        this.pipeline = pipeline;
    }

    process(logEvent: ILogEvent): Promise<ILogEvent> {
        return this.pipeline.process(logEvent).then(() => logEvent);
    }

    debug(message: string, data: ILogEventData = {}): void {
        this.process(new LogEvent( Math.round((new Date()).getTime() / 1000.0), message, LogLevel.DEBUG, data) );
    }

    info(message: string, data: ILogEventData = {}): void {
        this.process(new LogEvent( Math.round((new Date()).getTime() / 1000.0), message, LogLevel.INFO, data) );
    }

    warn(message: string, data: ILogEventData = {}): void {
        this.process(new LogEvent( Math.round((new Date()).getTime() / 1000.0), message, LogLevel.WARN, data) );
    }

    error(message: string, data: ILogEventData = {}): void {
        this.process(new LogEvent( Math.round((new Date()).getTime() / 1000.0), message, LogLevel.ERROR, data) );
    }

    fatal(message: string, data: ILogEventData = {}): void {
        this.process(new LogEvent( Math.round((new Date()).getTime() / 1000.0), message, LogLevel.FATAL, data) );
    }

    /**
     * Utility method that creates an empty LoggerBuilder
     */
    static builder(): LoggerBuilder {
        return new LoggerBuilder();
    }

    /**
     * Utility method that creates a LoggerBuilder that has a pre-configured MessagePrefixStage that prefixes all messages with the provided type's name
     * @param type the type that which name needs to be prefixed
     */
    static for(type: Function): LoggerBuilder {
        const builder = new LoggerBuilder();
        builder.prefix(`[${type.name}] - `);
        return builder;
    }

}

export class LoggerBuilder {

    public readonly pipeline: LoggerPipeline = new LoggerPipeline();

    /**
     * Adds a stage to the pipeline
     * @param stage
     */
    addStage(stage: IPipelineStage): LoggerBuilder {
        this.pipeline.addStage(stage);
        return this;
    }

    /**
     * Adds a {TimestampFormatterStage} to the pipeline for the logger that's being built.
     */
    timestamp(): LoggerBuilder  {
        return this.addStage(new TimestampPrefixStage());
    }

    /**
     * Adds a {MessagePrefixStage} that adds the provided prefix ({string} or {StringProvider}) to the pipeline for the logger that's being built.
     * @param prefix
     */
    prefix(prefix: string|StringProvider): LoggerBuilder {
        return this.addStage(new MessagePrefixStage(prefix));
    }

    /**
     * Adds an {PredicateFilterStage} with the provided predicate to the pipeline for the logger that's being built.
     * @param predicate
     */
    filter(predicate: ILogEventPredicate): LoggerBuilder {
        return this.addStage(new PredicateFilterStage(predicate));
    }

    /**
     * Adds a {SinkStage} to the pipeline for the logger that's being built.
     * @param sink 
     */
    sink(sinkStage: SinkStage): LoggerBuilder {
        return this.addStage(sinkStage);
    }

    /**
     * Adds a {LogLevelFilterStage} to the pipeline for the logger that's being built.
     * This will filter out all ILogEvents that have a {LogLevel} lower than the provided one.
     * @param minimumLogLevel 
     */
    logLevel(minimumLogLevel: LogLevel): LoggerBuilder {
        return this.addStage(new LogLevelFilterStage(minimumLogLevel));
    }

    /**
     * Adds a {DataFormatterStage} which will try to replace "{...}" sequences with values from the ILogEventData dictionary
     */
    includeData(): LoggerBuilder {
        return this.addStage(new DataInjectorStage());
    }

    /**
     * Builds the logger with the configured pipeline
     */
    build(): Logger {
        return new Logger(this.pipeline);
    }

}

