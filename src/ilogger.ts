'use strict'

export enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR,
    FATAL
}

export interface ILogEventPredicate {
    (event: ILogEvent): boolean;
}

export interface ILogEventData  {
    [index:string]:any;
}

/**
 * Base interface for a log events
 */
export interface ILogEvent {
    timestamp(): number,
    message(): string,
    level(): LogLevel,
    data(): ILogEventData,
}

/**
 * An ILogger logs things...
 */
export interface ILogger {
    /**
     * Log a debug message. 
     * @param message the message that has to be logged
     * @param options extra options object that accomponies the message
     */
    debug(message: string, data: ILogEventData): void;

    /**
     * Log an info message.
     * @param message the message that has to be logged
     * @param options extra options object that accomponies the message
     */
    info(message: string, data: ILogEventData): void;

    /**
     * Log a warning message. 
     * @param message the message that has to be logged
     * @param options extra options object that accomponies the message
     */
    warn(message: string, data: ILogEventData): void;

    /**
     * Log an error message. 
     * @param message the message that has to be logged
     * @param options extra options object that accomponies the message
     */
    error(message: string, data: ILogEventData): void;

    /**
     * Log a fatal message.
     * @param message the message that has to be logged
     * @param options extra options object that accompanies the message
     */
    fatal(message: string, data: ILogEventData):  void;
}
