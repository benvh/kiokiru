'use strict';

import { ILogEvent, LogLevel, ILogEventPredicate } from "../ilogger";
import { LogEventDecorator } from "../log-event-decorator";

/**
 * Overrides the ILogEvent's LogLevel
 */
export class LevelOverrideDecorator extends LogEventDecorator {

    private levelOverride: LogLevel;

    constructor(event: ILogEvent, level: LogLevel) {
        super(event);
        this.levelOverride = level;
    }

    level(): LogLevel {
        return this.levelOverride;
    }
}

/**
 * Conditionally overrides the ILogEvent's LogLevel
 */
export class ConditionalLevelDecorator extends LogEventDecorator {

    private levelOverride: LogLevel;
    private overridePredicate: ILogEventPredicate;

    constructor(event: ILogEvent, level: LogLevel, predicate: ILogEventPredicate) {
        super(event);
        this.levelOverride = level;
        this.overridePredicate = predicate;
    }

    level(): LogLevel {
        if (this.overridePredicate(this.event)) return this.levelOverride;
        return this.event.level();
    }

}