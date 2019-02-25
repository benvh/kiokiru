'use strict';

import { ILogEvent, LogLevel, ILogEventPredicate } from '../ilogger';
import { IPipelineStage } from "../logger-pipeline";

/**
 * Filters out ILogEvents from the pipeline
 */
export abstract class FilterStage implements IPipelineStage {

    process(logEvent: ILogEvent): Promise<ILogEvent> {
        if (!this.filter(logEvent)) return Promise.resolve(null);
        return Promise.resolve(logEvent);
    }

    abstract filter(event: ILogEvent): boolean;
}


/**
 * Filters out ILogEvents that  do not match the configured predicate.
 */
export class PredicateFilterStage extends FilterStage {

    private predicate: ILogEventPredicate;

    constructor(predicate: ILogEventPredicate) {
        super();
        this.predicate = predicate;
    }

    filter(event: ILogEvent): boolean {
        return this.predicate(event);
    }

}

/**
 * Filters out ILogEvents with a LogLevel lower than its configured level
 * e.g. when minLogLevel is configured to ERROR messages with level DEBUG, INFO and WARN are filtered out and only ERROR and FATAL are passed along
 */
export class LogLevelFilterStage extends FilterStage {

    private minLogLevel: LogLevel;

    constructor(minimumLogLevel: LogLevel) {
        super();
        this.minLogLevel = minimumLogLevel;
    }

    filter(event: ILogEvent): boolean {
        return event.level() >= this.minLogLevel;
    }

}
