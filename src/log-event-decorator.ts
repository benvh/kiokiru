'use strict';

import { ILogEvent, ILogEventData, LogLevel } from './ilogger';

/**
 * Base decorator class for ILogEvent decoration.
 *
 * It provides overridable default implementations for all ILogEvent methods.
 * The default implementation simply returns the value of original ILogEvent that needed decorating (the one that's provided in the constructor)
 */
export abstract class LogEventDecorator implements ILogEvent {
    protected event: ILogEvent;

    constructor(event: ILogEvent) {
        this.event = event;
    }

    timestamp(): number {
        return this.event.timestamp();
    }

    message(): string {
        return this.event.message();
    }

    level(): LogLevel {
        return this.event.level();
    }

    data(): ILogEventData {
        return this.event.data();
    }
}
